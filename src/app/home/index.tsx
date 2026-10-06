import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { OrderRadioButton } from '@/components/OrderRadioButton'
import { Quote } from '@/components/Quote'
import { StatusCheckbox } from '@/components/StatusCheckbox'
import { quoteStorage } from "@/storage/quote-storage"
import { styles } from '@/styles/home.styles'
import { OrderBy } from '@/types/OrderBy'
import { QuoteDoc } from '@/types/QuoteDoc'
import { QuoteStatus } from '@/types/QuoteStatus'
import { calculateQuoteTotal } from '@/utils/calculateQuoteTotal'
import { formatarData } from '@/utils/formatarData'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import { LinearGradient } from "expo-linear-gradient"
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useState } from "react"
import { FlatList, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from 'react-native'


export default function Home() {

    const [filterVisible, setFilterVisible] = useState(false)
    const [statusFilter, setStatusFilter] = useState<QuoteStatus[]>([])
    const [quotes, setQuotes] = useState<QuoteDoc[]>([])
    const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.LATEST)

    const [draftStatus, setDraftStatus] = useState<QuoteStatus[]>([])
    const [draftOrder, setDraftOrder] = useState<OrderBy>(OrderBy.LATEST)

    function newQuote() {
        router.navigate("./newquote")
    }

    function handleCancel() {
        setFilterVisible(false)
    }
    function handleReset() {
        setDraftStatus([])
        setDraftOrder(OrderBy.LATEST)
    }

    function openFilter() {
        setDraftStatus(statusFilter)   // copia aplicado -> rascunho
        setDraftOrder(orderBy)
        setFilterVisible(true)
    }

    function handleApply() {
        setStatusFilter(draftStatus)   // copia rascunho -> aplicado
        setOrderBy(draftOrder)
        setFilterVisible(false)
    }

    function toggleStatus(status: QuoteStatus) {
        if (draftStatus.includes(status)) {
            setDraftStatus(draftStatus.filter(s => s !== status))
        } else {
            setDraftStatus([...draftStatus, status])
        }
    }

    async function fetchQuotes() {
        const response = await quoteStorage.get()
        setQuotes(response)
    }

    useFocusEffect(useCallback(() => {
        fetchQuotes()
    }, []))


    function totalOf(quote: QuoteDoc) {
        return calculateQuoteTotal(quote.items, quote.discountPct ?? 0).total
    }

    //Contar quantos orçamentos estão em rascunho
    const draftQuotes = quotes.filter((q) => q.status === QuoteStatus.DRAFT).length

    const visibleQuotes = quotes
        .filter(q => statusFilter.length === 0 || statusFilter.includes(q.status))
        .sort((a, b) => {
            switch (orderBy) {
                case OrderBy.OLDEST:
                    return a.createdAt.localeCompare(b.createdAt)
                case OrderBy.HIGHERPRICE:
                    return totalOf(b) - totalOf(a)
                case OrderBy.LOWERPRICE:
                    return totalOf(a) - totalOf(b)
                default:
                    return b.createdAt.localeCompare(a.createdAt)
            }
        })
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

            <LinearGradient
                colors={["#3d0399fd", "#0a015cef"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >

                <View style={styles.header}>
                    <View style={styles.textContainer} >
                        <Text style={styles.title}>Orçamentos</Text>
                        <Text style={styles.subtitle}>Você tem {draftQuotes} {draftQuotes > 1 ? "itens " : "item "}em rascunho</Text>
                    </View>
                    <Button iconName="add" variant="primary" title="Novo" onPress={newQuote} />
                </View>

                <View style={styles.content}>
                    <View style={styles.form}>
                        <Input containerStyle={{ flex: 1 }} iconName="search" placeholder="Titulo ou Cliente" />
                        <Button iconName="tune" variant="icon" onPress={openFilter} />
                    </View>

                    <FlatList
                        data={visibleQuotes}
                        keyExtractor={quote => quote.id}
                        renderItem={({ item }) => (
                            <Quote
                                id={item.id}
                                title={item.title}
                                client={item.client}
                                createdAt={formatarData(item.createdAt ?? "")}
                                price={calculateQuoteTotal(item.items || []).total}
                                status={item.status}
                            />
                        )}
                    />

                </View>
            </LinearGradient>

            <Modal transparent visible={filterVisible} animationType="slide">
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={[styles.modalTitle, { color: "#000" }]}>Filtrar e Ordenar</Text>
                                <TouchableOpacity onPress={handleCancel}>
                                    <MaterialIcons name="close" color="#000" size={20} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ gap: 10 }}>
                                <Text style={[styles.title, { color: "#000" }]}>Status</Text>
                                {Object.values(QuoteStatus).map((status) => (
                                    <StatusCheckbox
                                        key={status}
                                        status={status}
                                        isSelected={draftStatus.includes(status)}
                                        onPress={() => toggleStatus(status)}
                                    />
                                ))}

                                <Text style={[styles.title, { color: "#000" }]}>Ordenação</Text>
                                {Object.values(OrderBy).map((option) => (
                                    <OrderRadioButton
                                        key={option}
                                        option={option}
                                        isSelected={draftOrder === option}
                                        onPress={() => setDraftOrder(option)}
                                    />
                                ))}
                            </View>

                            <View style={styles.footer}>
                                <Button
                                    variant="secondary"
                                    title="Resetar Filtros"
                                    onPress={handleReset}
                                />
                                <Button iconName="check" title="Aplicar" onPress={handleApply} />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </KeyboardAvoidingView>


    )
}
