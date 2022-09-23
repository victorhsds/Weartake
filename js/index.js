
const listaVitrine = document.querySelector(".lista-vitrine")
const listaCarrinho = document.querySelector(".lista-carrinho")
const carrinhoQuantidade = document.getElementById("quantidade-produtos")
const carrinhoTotal = document.getElementById("total-produtos")
const quantidadePrecoCarrinho = document.querySelector(".quantidade-preco")
const carrinhoVazioText = document.querySelector(".carrinho-vazio-text")
const inputPesquisa = document.getElementById("input-text")
const btnPesquisa = document.getElementById("btn-pesquisa")
const header = document.querySelector(".cabecalho")
let cartTotProdutos = 0
let cartQtProdutos = 0
let arrayCarrinho = []


header.addEventListener("click", listadoCategorias)
function listadoCategorias(event, arrayProdutos = data) {
    elementoClicado = event.target

    if (elementoClicado.tagName == "BUTTON") {
        let categoria = elementoClicado.innerText
        let array = []
        
        if (categoria != "Todos") {
            for (let i = 0; i < arrayProdutos.length; i++) {
                let produto = arrayProdutos[i]
                let produtoCategoria = produto.tag
                for (let j = 0; j < produtoCategoria.length; j++) {
                    if (produtoCategoria[j] == categoria) {
                        array.push(produto)
                    }
                }
            }
            listandoProdutos(array)
        } else {
            listandoProdutos()  
        }  
    }
    
}


function listandoProdutos (arrayProdutos = data, tagUl = listaVitrine) {

    tagUl.innerHTML = ""
    for (let i = 0; i < arrayProdutos.length; i++) {
        let produto = arrayProdutos[i]
        let card = criandoCard(produto)
        tagUl.appendChild(card)
    }
}
listandoProdutos()



function criandoCard(produto) {

    let produtoId = produto.id
    let produtoImg = produto.img
    let produtoNome = produto.nameItem
    let produtoDescricao = produto.description
    let produtoValor = produto.value
    let produtoAddCart = produto.addCart
    let produtoTag = produto.tag
    


    const tagLi = document.createElement("li")
    const divImg = document.createElement("div")
    const imgProduto = document.createElement("img")
    const divImformacoes = document.createElement("div") 
    const divCategoriaTitle = document.createElement("div")
    const spanCategoria = document.createElement("span")

    for (let i = 0; i < produtoTag.length; i++) {
        const spanCategoria = document.createElement("span")
        spanCategoria.innerText = produtoTag[i]
        divCategoriaTitle.appendChild(spanCategoria)
    }

    const nomeProduto = document.createElement("h2")
    const divDescricao = document.createElement("div")
    const pDescricao = document.createElement("p")
    const divPrecoBtn = document.createElement("div")
    const spanPreco = document.createElement("span")
    const btnAddCart = document.createElement("button")


    tagLi.classList.add("card")
    divImg.classList.add("img")
    divImformacoes.classList.add("informacoes")
    divCategoriaTitle.classList.add("categoria-title")
    divDescricao.classList.add("descricao")
    divPrecoBtn.classList.add("preco-btn")
    spanPreco.classList.add("preco")


    imgProduto.setAttribute("src", produtoImg.replace(".", ""))
    spanCategoria.innerText = produtoTag
    nomeProduto.innerText = produtoNome
    pDescricao.innerText = produtoDescricao
    spanPreco.innerText = `R$ ${produtoValor.toFixed(2).replace(".", ",")}`
    btnAddCart.innerText = produtoAddCart
    tagLi.setAttribute("id", produtoId)


    divImg.appendChild(imgProduto)
    divImformacoes.append(divCategoriaTitle, divDescricao, divPrecoBtn)
    divCategoriaTitle.append(nomeProduto)
    divDescricao.appendChild(pDescricao)
    divPrecoBtn.append(spanPreco, btnAddCart)
    tagLi.append(divImg, divImformacoes)

    return tagLi
}



listaVitrine.addEventListener("click", adcicionandoCarrinho)
function adcicionandoCarrinho (event, arrayProdutos = data) {
    
    elementoClicado = event.target

    if (elementoClicado.tagName == "BUTTON") {    
        let produto = elementoClicado.parentNode.parentNode.parentNode.cloneNode(true)
        produto.classList.add("produto-carrinho")
        let id = produto.id
        produto.querySelector("button").innerText = "Remover do carrinho"
        listaCarrinho.appendChild(produto)

        arrayCarrinho.push(produto)
        for (let i = 0; i < arrayProdutos.length; i++) {
            let produto = arrayProdutos[i]
            if (produto.id == id) {
                cartTotProdutos += arrayProdutos[i].value
            }
        }
        quantidadeTotalCarrinho(arrayCarrinho.length ,cartTotProdutos)
    }
}



listaCarrinho.addEventListener("click", removendoCarrinho)
function removendoCarrinho (event) {

    elementoClicado = event.target

    if (elementoClicado.tagName == "BUTTON") {
        let produto = elementoClicado.parentNode.parentNode.parentNode
        let index = produto.id
        produto.remove()
        arrayCarrinho.pop()
        cartTotProdutos -= data[index - 1].value
        quantidadeTotalCarrinho(arrayCarrinho.length, cartTotProdutos)
    }
}



function quantidadeTotalCarrinho (quantidade, total) {
    if (listaCarrinho.childElementCount > 0) {
        quantidadePrecoCarrinho.classList.remove("esconder")
        carrinhoVazioText.classList.add("esconder")
    } else {
        quantidadePrecoCarrinho.classList.add("esconder")
        carrinhoVazioText.classList.remove("esconder")
    }
    carrinhoQuantidade.innerText = quantidade
    carrinhoTotal.innerText = `R$ ${total.toFixed(2).replace(".", ",")}`
}



btnPesquisa.addEventListener("click", pesquisaProduto)
inputPesquisa.addEventListener("keypress", pesquisaProduto)
function pesquisaProduto (event, arrayProdutos = data) {
    
    let pesquisa = inputPesquisa.value.trim().toLowerCase()
    let arrayPesquisa = []

    if (event.type == "keypress" && event.keyCode == 13 || event.type == "click") {
        if (pesquisa != "") {
            for(let i = 0; i < arrayProdutos.length; i++) {
                let nomeProduto = arrayProdutos[i].nameItem
                nomeProduto = nomeProduto.toLowerCase().trim()
                if (nomeProduto.includes(pesquisa)) {
                    arrayPesquisa.push(arrayProdutos[i])
                }
            }
            listandoProdutos(arrayPesquisa)
        } else {
            listandoProdutos()
        }
    }
}







