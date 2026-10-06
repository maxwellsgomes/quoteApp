export function formatarData(dataString?: string, toFile: boolean = false) {
    if (!dataString) return toFile ? "000000" : "--/--/----";
    
    const data = new Date(dataString);
    const dataBR = data.toLocaleDateString('pt-BR')

    if (toFile){
        const [dia, mes, ano] = dataBR.split('/')
        return `${dia}${mes}${ano.slice(-2)}`
    }
    return dataBR
}