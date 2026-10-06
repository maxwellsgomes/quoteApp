import { QuoteDoc } from "@/types/QuoteDoc"
import AsyncStorage from "@react-native-async-storage/async-storage"

const QUOTE_STORAGE_KEY = "quotes-storage"

async function get(): Promise<QuoteDoc[]>{
    const storage = await AsyncStorage.getItem(QUOTE_STORAGE_KEY)
    const response = storage ? JSON.parse(storage) : []

    return response
}

async function getById(id: string): Promise<QuoteDoc | undefined>{
    const storage = await get()
    return storage.find((quote) => quote.id === id)
}

async function save(newQuote: QuoteDoc){
    try {
        const storage = await get()
        const updated = JSON.stringify([...storage, newQuote])
        await AsyncStorage.setItem(QUOTE_STORAGE_KEY, updated)

    } catch (error) {
        throw error
    }
}
async function remove(id: string){
    try{
        const storage = await get()
        const updated = storage.filter((quote) => quote.id !== id)
        await AsyncStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(updated))
    }catch(error){
        throw error
    }
}
async function update(updatedQuote: QuoteDoc){
    const storage = await get()
    const updated = storage.map((quote) =>
        quote.id === updatedQuote.id ? updatedQuote : quote
    )
    await AsyncStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(updated))
}

export const quoteStorage = {
    get, save, remove, update, getById
}