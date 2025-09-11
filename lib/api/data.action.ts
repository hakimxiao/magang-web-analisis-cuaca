export const hasilAnalisisCuaca = async(adm3: string = "09", adm4: string = "1004") => {
    const urlBMKG = new URL(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=16.71.${adm3}.${adm4}`);
    
    try {
        const dataBMKG = await fetch(urlBMKG, {
            cache: "no-store"
        });
        return dataBMKG.json();
    } catch (error) {
        console.log(error);
    }
}