//import jsonData from "./data.json" assert { type: "json" };

function getFamilia(jsonData) {
    const familiasUnicas = new Set();
    // Recorrer el JSON y agregar cada valor de familia al conjunto
    jsonData.forEach((item) => 
    {
        if (item.familia) 
        {
            familiasUnicas.add(item.familia);
        }
    });
    // Convertir el conjunto a un array para una mejor visualización
    const arrayFamiliasUnicas = Array.from(familiasUnicas);

    //console.log(arrayFamiliasUnicas);
    return arrayFamiliasUnicas;
}

function productFamilia(jsonData, familia) {
    const productosFamilia = [];
    // Recorrer el JSON y agregar cada valor de familia al conjunto
    jsonData.forEach((item) => {
        if (item.familia === familia) {
            productosFamilia.push(item);
        }
    });
    //console.log(productosFamilia);
    return productosFamilia;
}

function getFormato(jsonData) {
    const familiasUnicas = new Set();
    // Recorrer el JSON y agregar cada valor de familia al conjunto
    jsonData.forEach((item) => {
        if (item.formato) {
            familiasUnicas.add(item.formato);
        }
    });
    // Convertir el conjunto a un array para una mejor visualización
    const arrayFamiliasUnicas = Array.from(familiasUnicas);

    //console.log(arrayFamiliasUnicas);
    return arrayFamiliasUnicas;
}

function productFormato(jsonData, formato) {
    const productosFamilia = [];
    // Recorrer el JSON y agregar cada valor de familia al conjunto
    jsonData.forEach((item) => {
        if (item.formato === formato) {
            productosFamilia.push(item);
        }
    });
    //console.log(productosFamilia);
    return productosFamilia;
}

function productFamiliaFormato(jsonData, familia, formato) {
    const productosFamilia = [];
    // Recorrer el JSON y agregar cada valor de familia al conjunto
    jsonData.forEach((item) => {
        if (item.familia === familia && item.formato === formato) {
            productosFamilia.push(item);
        }
    });
    //console.log(productosFamilia);
    return productosFamilia;
}

function getTipoTrafico(jsonData)
{
    const TipoTrafico = new Set();
    // Recorrer el JSON y agregar cada valor de familia al conjunto
    jsonData.forEach((item) => {
        if (item.tipoTrafico) {TipoTrafico.add(item.tipoTrafico);}
    });
    // Convertir el conjunto a un array para una mejor visualización
    const arrayTipoTrafico = Array.from(TipoTrafico);

    console.log(arrayTipoTrafico);
    return TipoTrafico;    
}

function LstproductosTrafico(jsonData, Valor) 
{
    const Result = [];
    // Recorrer el JSON y agregar cada valor de tipoTrafico al conjunto
    jsonData.forEach((item) => {
        if (item.tipoTrafico === Valor)
        {
          Result.push(item);
        }
    });
    //console.log(Result);
    return Result;
}

function getclasificacionAnsi(jsonData)
{
    const clasificacionAnsi = new Set();
    // Recorrer el JSON y agregar cada valor de familia al conjunto
    jsonData.forEach((item) => {
        if (item.clasificacionAnsi) {clasificacionAnsi.add(item.clasificacionAnsi);}
    });
    // Convertir el conjunto a un array para una mejor visualización
    const arrayclasificacionAnsi = Array.from(clasificacionAnsi);

    console.log(arrayclasificacionAnsi);
    return arrayclasificacionAnsi;
}

function LstproductosClasificacionANSI(jsonData, Valor) 
{
    const Result = [];
    // Recorrer el JSON y agregar cada valor de clasificacionAnsi al conjunto
    jsonData.forEach((item) => {
        if (item.clasificacionAnsi === Valor)
        {
          Result.push(item);
        }
    });
    //console.log(Result);
    return Result;
}