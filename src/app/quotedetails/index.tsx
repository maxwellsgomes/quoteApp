import { Button } from "@/components/Button"
import { QuoteItem } from "@/components/QuoteItem"
import { Section } from "@/components/Section"
import { quoteStorage } from "@/storage/quote-storage"
import { colors } from "@/styles/colors"
import { styles as badgeStyles } from "@/styles/components/quote.styles"
import { styles } from "@/styles/quotedetails.styles"
import { QuoteDoc } from "@/types/QuoteDoc"
import { QuoteBgColor, QuoteStatus, QuoteStatusColor, QuoteStatusLabel } from "@/types/QuoteStatus"
import { calculateQuoteTotal } from "@/utils/calculateQuoteTotal"
import { formatarData } from "@/utils/formatarData"
import { buildQuoteHtml } from "@/utils/quote-pdf"
import MaterialIcons from "@react-native-vector-icons/material-icons"
import * as FileSystem from "expo-file-system/legacy"
import { LinearGradient } from "expo-linear-gradient"
import * as Print from "expo-print"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router"
import * as Sharing from "expo-sharing"
import { useCallback, useState } from "react"
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native"

export default function ViewQuote() {

    const { id } = useLocalSearchParams()
    const [quote, setQuote] = useState<QuoteDoc | null>(null)

    async function fetchQuote() {
        const response = await quoteStorage.get()
        const selectedQuote = response.find(q => q.id === id)

        if (selectedQuote) {
            setQuote(selectedQuote)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchQuote()
    }, [id]))

    if (!quote) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    const { subtotal, discountValue, total } = calculateQuoteTotal(
        quote.items || [],
        quote.discountPct
    )

    const formatMoney = (valor: number) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const label = QuoteStatusLabel[quote.status];
    const color = QuoteStatusColor[quote.status];
    const bgcolor = QuoteBgColor[quote.status];

    //DELETAR ORÇAMENTO
    async function handleDelete() {
        Alert.alert(
            "Exluir Orçamento",
            "Tem certeza que deseja excluir o orçamento? Essa ação não pode ser desfeita!",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        await quoteStorage.remove(id as string)
                        router.back()
                    }
                }
            ]
        )
    }

    //DUPLICAR ORÇAMENTO
    async function handleDuplicate() {
        if (!quote) return;
        Alert.alert(
            "Duplicar Orçamento",
            "Deseja duplicar este orçamento?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Duplicar",
                    style: "default",
                    onPress: async () => {
                        const newId = Date.now().toString()
                        const duplicatedQuote: QuoteDoc = {
                            ...quote,
                            id: newId,
                            title: `${quote.title} (Cópia)`,
                            status: QuoteStatus.DRAFT,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        }
                        await quoteStorage.save(duplicatedQuote)
                        Alert.alert("Sucesso!", "Orçamento duplicado com sucesso!")
                        router.back()
                    }
                }
            ]
        )
    }

    //EDITAR O ORÇAMENTO
    function handleEdit() {
        router.push({ pathname: "/newquote", params: { id: quote?.id } })
    }

    //COMPARTILHAR ORÇAMENTO
    async function handleShare() {
        if (!quote) return

        try {
            const { uri } = await Print.printToFileAsync({ html: await buildQuoteHtml(quote) })

            const formattedDate = formatarData(quote.createdAt, true)
            const fileName = `Orcamento-${quote.client}-${formattedDate}.pdf`
            const newUri = `${FileSystem.cacheDirectory}${fileName}`

            await FileSystem.deleteAsync(newUri, { idempotent: true })

            await FileSystem.moveAsync({from: uri, to: newUri})

            if (!(await Sharing.isAvailableAsync())) {
                return Alert.alert("Erro", "Compartilhamento indisponível neste dispositovo")
            }

            await Sharing.shareAsync(newUri, {
                mimeType: "application/pdf",
                dialogTitle: "Compartilhar Orçamento",
                UTI: "com.adobe.pdf",
            })
        } catch (error) {
            Alert.alert("Erro", "Não foi possível gerar o PDF")
        }
    }

    return (

        <LinearGradient
            colors={["#3d0399fd", "#0a015cef"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={router.back}>
                            <MaterialIcons name="arrow-back-ios" size={25} color={colors.gray[100]}/>
                        </TouchableOpacity>
                        <Text style={styles.quoteNumber}>Orçamento #{quote.id}</Text>
                    </View>
                    <View style={[badgeStyles.statusTag, { backgroundColor: bgcolor }]}>
                        <View style={[badgeStyles.statusDot, { backgroundColor: color }]} />
                        <Text style={[badgeStyles.statusText, { color: color }]}>{label}</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailsHeader}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="construction" size={45} color={colors.purple[500]} />
                            </View>
                            <Text numberOfLines={2} style={styles.quoteTitle}>
                                {quote.title}
                            </Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.detailsClient}>
                            <Text style={styles.label}>Cliente</Text>
                            <Text style={styles.labelDetail}>{quote.client}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                            <View style={styles.detailsClient}>
                                <Text style={styles.label}>Contato</Text>
                                <Text style={styles.labelDetail}>
                                    {quote.contato}
                                </Text>
                            </View>

                            <View style={styles.detailsClient}>
                                <Text style={styles.label}>Criado em</Text>
                                <Text style={styles.labelDetail}>
                                    {formatarData(quote.createdAt)}
                                </Text>
                            </View>
                            <View style={styles.detailsClient}>
                                <Text style={styles.label}>Modificado em</Text>
                                <Text style={styles.labelDetail}>
                                    {formatarData(quote.updatedAt)}
                                </Text>
                            </View>
                        </View>

                    </View>
                    <Section header={true} title="Serviços Inclusos" iconName="list">
                        {quote.items?.map((item) => (
                            <QuoteItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                qty={item.qty}
                                description={item.description}
                                showEditIcon={false}
                            />
                        ))}
                    </Section>

                    <Section header={false} variant="highlight">
                        <View style={styles.detailsHeader}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="request-quote" size={45} color={colors.purple[500]} />
                            </View>

                            <View style={styles.totalQuoteContainer}>
                                <View style={styles.totalRow}>
                                    <Text style={styles.totalSecondaryLabel}>Subtotal</Text>
                                    {discountValue > 0 ?
                                        <Text style={styles.oldPrice}>{formatMoney(subtotal)}</Text>
                                        : <Text style={styles.labelDetail}>{formatMoney(subtotal)}</Text>
                                    }
                                </View>

                                <View style={styles.totalRow}>
                                    <View style={{ flexDirection: "row", gap: 10 }}>
                                        <Text style={styles.totalSecondaryLabel}>Desconto</Text>

                                        {discountValue > 0 ?
                                            <View style={[badgeStyles.statusTag, { backgroundColor: colors.green[300] }]}>
                                                <Text style={[badgeStyles.statusText, { color: colors.green[500] }]}>{quote.discountPct}% off</Text>
                                            </View>
                                            : null
                                        }

                                    </View>
                                    <Text style={[styles.labelDetail, { color: "#d30000" }]}>-{formatMoney(discountValue)}</Text>
                                </View>

                                <View style={[styles.totalRow, { borderTopWidth: 0.8, marginTop: 10, borderColor: colors.gray[200] }]}>

                                    <Text style={styles.totalQuoteLabel}>Investimento Total</Text>
                                    <Text style={styles.totalQuote}>{formatMoney(total)}</Text>
                                </View>
                            </View>



                        </View>
                    </Section>
                </View>
            </ScrollView>
            <View style={styles.actionFooter}>

                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Button variant="icon" title="delete" iconName="delete" onPress={handleDelete} />
                    <Button variant="icon" title="copiar" iconColor={colors.purple[500]} iconName="content-copy" onPress={handleDuplicate} />
                    <Button variant="icon" title="editar" iconColor={colors.purple[500]} iconName="edit" onPress={handleEdit} />
                </View>
                <Button variant="primary" title="compartilhar" iconColor="#fff" iconName="share" onPress={handleShare} />
            </View>
        </LinearGradient>

    )
}