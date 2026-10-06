import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { QuoteItem } from "@/components/QuoteItem"
import { Section } from "@/components/Section"
import { StatusRadioButton } from "@/components/StatusRadioButton/StatusRadioButton"
import { quoteStorage } from "@/storage/quote-storage"
import { colors } from "@/styles/colors"
import { styles } from "@/styles/newquote.styles"
import { Item } from "@/types/Item"
import { QuoteStatus } from "@/types/QuoteStatus"
import { calculateQuoteTotal } from "@/utils/calculateQuoteTotal"
import MaterialIcons from "@react-native-vector-icons/material-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { ActivityIndicator, Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

function makeSnapshot(
    title: string,
    client: string,
    contato: string,
    status: QuoteStatus,
    items: Item[],
    discount: string
) {
    return JSON.stringify({ title, client, contato, status, items, discount })
}

export default function NewQuote() {

    const insets = useSafeAreaInsets()
    //Campos da tela principal do orçamento
    const [quoteTitle, setQuoteTitle] = useState("")
    const [quoteClient, setQuoteClient] = useState("")
    const [quoteContato, setQuoteContato] = useState("")
    const [selectedStatus, setSelectedStatus] = useState<QuoteStatus>(QuoteStatus.DRAFT)
    const [items, setItems] = useState<Item[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [editingItem, setEditingItem] = useState<Item | undefined>()
    const statusOptions = Object.values(QuoteStatus)

    //Modo edição de orçamento
    const { id } = useLocalSearchParams<{ id?: string }>()
    const isEditing = !!id
    const [loading, setLoading] = useState(isEditing)
    const [createdAt, setCreatedAt] = useState<string>()

    //Campos do Item de Orçamento
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [itemQtd, setItemQtd] = useState<number>(1)
    const [discountPercent, setDiscountPercent] = useState("")

    const initialSnapshot = useRef(
        makeSnapshot("", "", "", QuoteStatus.DRAFT, [], "")
    )
    useEffect(() => {
        if (!id) return

        async function loadQuote() {
            try {
                const quote = await quoteStorage.getById(id!)

                if (!quote) {
                    Alert.alert("Erro", "Orçamento não encontrado")
                    return router.back()
                }
                setQuoteTitle(quote.title)
                setQuoteClient(quote.client)
                setQuoteContato(quote.contato)
                setSelectedStatus(quote.status)
                setItems(quote.items)
                const saveDiscount = quote.discountPct ?? 0
                const discountText = saveDiscount > 0 ? String(saveDiscount) : ""
                setDiscountPercent(discountText)
                setCreatedAt(quote.createdAt)

                initialSnapshot.current = makeSnapshot(
                    quote.title,
                    quote.client,
                    quote.contato,
                    quote.status,
                    quote.items,
                    discountText
                )



            } catch (error) {
                Alert.alert("Erro", "Não foi possível carregar o orçamento")
            } finally {
                setLoading(false)
            }
        }
        loadQuote()
    }, [id])


    function handleAddItem() {
        setModalVisible(true)
        setEditingItem(undefined)
        setTitle("")
        setPrice("")
        setDescription("")
        setItemQtd(1)
    }
    function increaseQty() {
        setItemQtd(itemQtd + 1)
    }
    function decreaseQty() {
        if (itemQtd > 1) {
            setItemQtd(itemQtd - 1)
        }
    }
    function handleEditItem(item: Item) {
        setEditingItem(item)
        setModalVisible(true)
        setTitle(item.title)
        setItemQtd(item.qty)
        setDescription(item.description)
        setPrice(item.price.toFixed(2).replace('.', ','))
    }

    function handleCancel() {
        const isEmpty = !title.trim() && !description.trim() && !price.trim()

        const unchanged = editingItem
            ? title === editingItem.title &&
            description === editingItem.description &&
            price === editingItem.price.toString() &&
            itemQtd === editingItem.qty
            : isEmpty && itemQtd === 1

        if (unchanged) {
            return setModalVisible(false)
        }

        Alert.alert("Cancelar", "Deseja descartar as alterações?", [
            { style: "cancel", text: "Não" },
            { text: "Sim", onPress: () => setModalVisible(false) },
        ])
    }

    function handleCancelQuote() {
        const hasChanges =
            makeSnapshot(
                quoteTitle, quoteClient, quoteContato,
                selectedStatus, items, discountPercent
            ) !== initialSnapshot.current

        if (!hasChanges) {
            return router.back()
        }

        Alert.alert("Cancelar", "Deseja descartar as alterações?", [
            { style: "cancel", text: "Não" },
            { text: "Sim", onPress: () => router.back() },
        ])
    }

    function handleRemove(itemId: string) {
        Alert.alert("Remover Item", "Tem certeza que deseja remover este item?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Remover", onPress: () => {
                    setItems(prevItems => prevItems.filter(item => item.id !== itemId))
                    setModalVisible(false);
                    setTitle("");
                    setDescription("");
                    setPrice("");
                    setItemQtd(1);
                    setEditingItem(undefined);
                }
            }
        ]

        )

    }

    async function handleSaveItem() {
        try {
            if ((!title.trim()) || (!description.trim()) || (!price.trim())) {
                return Alert.alert("Erro", "Preencha todos os campos!")
            }

            const numericPrice = parseFloat(price.replace(',','.')) || 0

            if (editingItem) {

                const updatedItem: Item = {
                    ...editingItem,
                    title,
                    description,
                    qty: itemQtd,
                    price: numericPrice,
                }

                setItems(prevItems => [...prevItems.map(i => i.id === editingItem.id ? updatedItem : i)])

            } else {
                const newItem: Item = {
                    id: new Date().getTime().toString(),
                    title,
                    description,
                    qty: itemQtd,
                    price: numericPrice,
                }
                setItems(prevItems => [...prevItems, newItem])
            }

            setModalVisible(false);
            setTitle("");
            setDescription("");
            setPrice("");
            setItemQtd(1);
            setEditingItem(undefined);

        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar o item")
            console.log(error)
        }
    }
    async function handleSaveQuote() {
        const now = new Date().toISOString()
        try {
            if ((!quoteTitle.trim()) || (!quoteClient.trim())) {
                return Alert.alert("Erro", "Verifique os campos: Título e Cliente")
            } if (items.length < 1) {
                return Alert.alert("Erro", "Você precisa adicionar pelo menos um serviço!")
            }
            //SALVAMENTO DO ORÇAMENTO
            const quoteData = {
                client: quoteClient,
                title: quoteTitle,
                contato: quoteContato,
                items,
                discountPct: Number(discountPercent) > 0 ? Number(discountPercent) : 0,
                status: selectedStatus,
            }

            if (isEditing) {
                await quoteStorage.update({
                    ...quoteData,
                    id: id!,
                    createdAt: createdAt!,
                    updatedAt: now,
                })
            } else {
                await quoteStorage.save({
                    ...quoteData,
                    id: new Date().getTime().toString(),
                    createdAt: now,
                    updatedAt: now,
                })
            }
            router.back()
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar o orçamento")
        }
    }


    const {
        subtotal,
        discountValue,
        total
    } = calculateQuoteTotal(items, Number(discountPercent) || 0)



    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }



    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <LinearGradient
                colors={["#3d0399fd", "#0a015cef"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
            >
                <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleCancelQuote}>
                            <MaterialIcons name="arrow-back-ios" size={25} color={colors.gray[200]} />
                        </TouchableOpacity>
                        <Text style={styles.title}>{isEditing ? "Editar orçamento" : "Novo orçamento"}</Text>
                    </View>
                    <View style={[styles.content, { paddingBottom: insets.bottom + 20 }]}>
                        <Section header={true} title="Informações gerais" iconName="receipt">
                            <Input placeholder="Título" value={quoteTitle} onChangeText={setQuoteTitle} containerStyle={{ backgroundColor: 'transparent' }} />
                            <Input placeholder="Cliente" value={quoteClient} onChangeText={setQuoteClient} containerStyle={{ backgroundColor: 'transparent' }} />
                            <Input placeholder="Contato" value={quoteContato} onChangeText={setQuoteContato} containerStyle={{ backgroundColor: 'transparent' }} />
                        </Section>


                        <Section header={true} title="Status" iconName="sell">
                            <View style={styles.statusGrid}>
                                {statusOptions.map((status) => (
                                    <StatusRadioButton
                                        key={status}
                                        status={status}
                                        isSelected={selectedStatus === status}
                                        onPress={() => setSelectedStatus(status)}
                                    />
                                ))}
                            </View>
                        </Section>

                        <Section header={true} title="Serviços Inclusos" iconName="assignment">
                            {items.map((item) => (
                                <QuoteItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    qty={item.qty}
                                    description={item.description}
                                    onEdit={() => handleEditItem(item)}
                                    onRemove={() => handleRemove(item.id)}
                                />
                            ))}


                            <Button title="Adicionar Serviço" variant="secondary" iconName="add" onPress={() => handleAddItem()} />
                        </Section>

                        <Section header={true} title="Investimento" iconName="account-balance-wallet">


                            <View style={styles.totalRow}>
                                <View>
                                    <Text>Subtotal</Text>
                                </View>
                                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                                    <Text style={styles.totalItemCount}>
                                        {items.length == 0 ? "" : items.length == 1 ? items.length + " item" : items.length + " itens"}
                                    </Text>
                                    <Text style={styles.subTotalPrice}>
                                        R$ {subtotal.toFixed(2)}
                                    </Text>
                                </View>

                            </View>
                            <View style={styles.totalRow}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 15,


                                }}>
                                    <Text>Desconto</Text>
                                    <Input
                                        value={discountPercent}
                                        onChangeText={setDiscountPercent}
                                        keyboardType="numeric"
                                        suffix="%"
                                        containerStyle={{
                                            backgroundColor: 'transparent',
                                            paddingHorizontal: 8,
                                            width: 88,
                                        }}
                                        inputStyle={{
                                            textAlign: "center",
                                            padding: 0,
                                            fontSize: 16,
                                        }}
                                    />

                                </View>
                                <Text style={styles.discountPrice}>- R$ {discountValue.toFixed(2)}</Text>

                            </View>

                            <View style={styles.totalRow}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                                    <Text>Valor Total</Text>
                                </View>
                                <View>

                                    {/* Aqui abaixo verifica se teve desconto. Caso negativo, não mostrará a label abaixo */}
                                    {discountValue > 0 ?
                                        <Text style={styles.oldPrice}>R$ {subtotal.toFixed(2)}</Text>
                                        : null
                                    }

                                    <Text style={styles.totalPrice}>R$ {total.toFixed(2)}</Text>
                                </View>
                            </View>

                        </Section>

                        <View style={styles.divider} />
                        <View style={styles.footer}>

                            <Button variant="secondary" title="Cancelar" onPress={handleCancelQuote} />
                            <Button iconName="check" title="Salvar" onPress={handleSaveQuote} />
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
            <Modal transparent visible={modalVisible} animationType="slide">
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Serviço {editingItem != undefined ? " - Edição" : " - Adicionar"}</Text>
                                <TouchableOpacity onPress={handleCancel}>
                                    <MaterialIcons name="close" color="#000" size={20} />
                                </TouchableOpacity>
                            </View>
                            <Input
                                placeholder="Titulo"
                                onChangeText={setTitle}
                                containerStyle={{ backgroundColor: 'transparent' }}
                                value={title}
                            />
                            <Input
                                placeholder="Descrição" onChangeText={setDescription}
                                numberOfLines={3}
                                multiline={true}
                                textAlignVertical="top"
                                containerStyle={{
                                    backgroundColor: 'transparent',
                                    height: 100,
                                    alignItems: "flex-end",
                                    borderRadius: 30
                                }}
                                value={description}
                            />

                            <View style={styles.containerPrice}>
                                <Input
                                    placeholder="Valor" 
                                    keyboardType="decimal-pad"
                                    onChangeText={(text) => {
                                        let clean = text.replace(/[^0-9.,]/g, '')
                                        const separatorCount = (clean.match(/[,.]/g) || []).length
                                        if (separatorCount > 1){
                                            return
                                        }
                                        setPrice(clean)
                                    }}
                                    containerStyle={{
                                        backgroundColor: 'transparent',
                                        flex: 2
                                    }}
                                    value={price}
                                />
                                <View style={styles.qtySelector}>
                                    <TouchableOpacity style={styles.qtyButton} onPress={decreaseQty}>
                                        <MaterialIcons name="remove" size={20} color="#6A46EB" />
                                    </TouchableOpacity>

                                    <Text style={styles.qtyNumber} >{itemQtd}</Text>

                                    <TouchableOpacity style={styles.qtyButton} onPress={increaseQty}>
                                        <MaterialIcons name="add" size={20} color="#6A46EB" />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={styles.footer}>
                                {editingItem != undefined ?
                                    <Button
                                        variant="icon"
                                        title="Excluir"
                                        onPress={() => { handleRemove(editingItem.id) }}
                                        iconName="delete"
                                    />
                                    :
                                    <Button
                                        variant="secondary"
                                        title="Cancelar"
                                        onPress={handleCancel}
                                    />
                                }
                                <Button iconName="check" title="Salvar" onPress={handleSaveItem} />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </KeyboardAvoidingView>
    )
}