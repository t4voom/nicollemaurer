// ========== SISTEMA DE CARRINHO COMPLETO E FUNCIONAL ==========

// Array do carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinho_caru')) || [];

// Produtos do site - IDs ÚNICOS para todos os produtos
const produtosSite = {
    // Best Sellers
    "prod-1": { 
        id: "prod-1", 
        name: "Case Classic Black", 
        price: 98.00, 
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        category: "Case para celular" 
    },
    "prod-2": { 
        id: "prod-2", 
        name: "Alça Premium", 
        price: 228.00, 
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        category: "Alça para celular" 
    },
    "prod-3": { 
        id: "prod-3", 
        name: "Case Urban", 
        price: 138.00, 
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        category: "Case urbano" 
    },
    "prod-4": { 
        id: "prod-4", 
        name: "Alça Diamond", 
        price: 358.00, 
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        category: "Edição limitada" 
    },
    
    // Queridinhos
    "fav-1": { 
        id: "fav-1", 
        name: "Case Classic Black", 
        price: 98.00, 
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80", 
        category: "Favorito" 
    },
    "fav-2": { 
        id: "fav-2", 
        name: "Alça Premium", 
        price: 228.00, 
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80", 
        category: "Favorito" 
    },
    "fav-3": { 
        id: "fav-3", 
        name: "Case Urban", 
        price: 138.00, 
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80", 
        category: "Favorito" 
    },
    "fav-4": { 
        id: "fav-4", 
        name: "Alça Diamond", 
        price: 358.00, 
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80", 
        category: "Favorito" 
    }
};

// ========== FUNÇÕES PRINCIPAIS DO CARRINHO ==========

// Atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    const cartCount = document.querySelector('.cart-count');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartCount) {
        cartCount.textContent = totalItens;
        cartCount.style.display = totalItens > 0 ? 'flex' : 'none';
        
        // Animação do contador
        cartCount.classList.add('bounce');
        setTimeout(() => cartCount.classList.remove('bounce'), 300);
        
        if (totalItens > 0) {
            cartIcon.classList.add('has-items');
        } else {
            cartIcon.classList.remove('has-items');
        }
    }
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(productId, botaoClicado) {
    console.log(`🛒 Adicionando: ${productId}`);
    
    const produto = produtosSite[productId];
    if (!produto) {
        console.error(`❌ Produto não encontrado: ${productId}`);
        return;
    }
    
    // Feedback visual no botão
    if (botaoClicado) {
        botaoClicado.classList.add('adding');
        const textoOriginal = botaoClicado.innerHTML;
        botaoClicado.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adicionando...';
        
        setTimeout(() => {
            botaoClicado.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
            botaoClicado.classList.remove('adding');
            botaoClicado.classList.add('added');
            
            setTimeout(() => {
                botaoClicado.classList.remove('added');
                botaoClicado.innerHTML = textoOriginal;
            }, 1500);
        }, 300);
    }
    
    // Verificar se produto já está no carrinho
    const itemIndex = carrinho.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        // Aumentar quantidade se já existe
        carrinho[itemIndex].quantidade += 1;
        console.log(`📈 Aumentando quantidade para: ${carrinho[itemIndex].quantidade}`);
    } else {
        // Adicionar novo item
        carrinho.push({
            id: produto.id,
            name: produto.name,
            price: produto.price,
            image: produto.image,
            category: produto.category,
            quantidade: 1
        });
        console.log(`🆕 Novo item: ${produto.name}`);
    }
    
    // Salvar no localStorage
    localStorage.setItem('carrinho_caru', JSON.stringify(carrinho));
    
    // Atualizar UI
    atualizarContadorCarrinho();
    
    // Se o carrinho estiver aberto, atualizar
    if (document.getElementById('cartSidebar').classList.contains('active')) {
        renderizarCarrinho();
        atualizarTotalCarrinho();
    }
    
    // Mostrar notificação
    mostrarNotificacao(produto.name);
}

// Remover produto do carrinho (remover completamente)
function removerDoCarrinho(productId) {
    console.log(`🗑️ Removendo: ${productId}`);
    
    // Filtrar o item removido
    carrinho = carrinho.filter(item => item.id !== productId);
    
    // Salvar no localStorage
    localStorage.setItem('carrinho_caru', JSON.stringify(carrinho));
    
    // Atualizar UI
    atualizarContadorCarrinho();
    renderizarCarrinho();
    atualizarTotalCarrinho();
}

// Atualizar quantidade de um produto (para botões +/-)
function atualizarQuantidadeCarrinho(productId, tipo) {
    console.log(`🔢 Atualizando quantidade: ${productId}, ${tipo}`);
    
    const itemIndex = carrinho.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;
    
    const item = carrinho[itemIndex];
    
    if (tipo === 'aumentar') {
        item.quantidade += 1;
        console.log(`➕ Quantidade aumentada para: ${item.quantidade}`);
    } else if (tipo === 'diminuir') {
        if (item.quantidade > 1) {
            item.quantidade -= 1;
            console.log(`➖ Quantidade diminuída para: ${item.quantidade}`);
        } else {
            // Se quantidade for 1 e clicar em diminuir, remove o item
            removerDoCarrinho(productId);
            return;
        }
    }
    
    // Salvar no localStorage
    localStorage.setItem('carrinho_caru', JSON.stringify(carrinho));
    
    // Atualizar apenas o item específico (performance)
    atualizarItemNoCarrinho(productId);
    
    // Atualizar totais
    atualizarContadorCarrinho();
    atualizarTotalCarrinho();
}

// Atualizar visualização de um item específico no carrinho
function atualizarItemNoCarrinho(productId) {
    const itemElement = document.querySelector(`.cart-item[data-id="${productId}"]`);
    if (!itemElement) return;
    
    const item = carrinho.find(item => item.id === productId);
    if (!item) return;
    
    // Atualizar quantidade no display
    const quantityDisplay = itemElement.querySelector('.quantity-display');
    if (quantityDisplay) {
        quantityDisplay.textContent = item.quantidade;
        
        // Animação de atualização
        quantityDisplay.classList.add('updating');
        setTimeout(() => quantityDisplay.classList.remove('updating'), 300);
    }
    
    // Atualizar preço total do item
    const precoTotal = (item.price * item.quantidade).toFixed(2).replace('.', ',');
    const totalElement = itemElement.querySelector('.cart-item-total strong');
    if (totalElement) {
        totalElement.textContent = `R$${precoTotal}`;
    }
}

// Renderizar todos os itens do carrinho
function renderizarCarrinho() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    
    if (!cartItems) return;
    
    // Limpar itens atuais (exceto a mensagem de vazio)
    const itensAtuais = cartItems.querySelectorAll('.cart-item');
    itensAtuais.forEach(item => item.remove());
    
    // Verificar se carrinho está vazio
    if (carrinho.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'flex';
        return;
    }
    
    if (cartEmpty) cartEmpty.style.display = 'none';
    
    // Adicionar cada item do carrinho
    carrinho.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.dataset.id = item.id;
        
        const precoUnitario = item.price.toFixed(2).replace('.', ',');
        const precoTotal = (item.price * item.quantidade).toFixed(2).replace('.', ',');
        
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">R$${precoUnitario} cada</p>
                
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${item.id}" data-action="diminuir">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantidade}</span>
                        <button class="quantity-btn plus" data-id="${item.id}" data-action="aumentar">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i> Remover
                    </button>
                </div>
                
                <div class="cart-item-total">
                    Total: <strong>R$${precoTotal}</strong>
                </div>
            </div>
        `;
        
        // Adicionar animação de entrada
        itemElement.style.animationDelay = `${index * 0.1}s`;
        itemElement.classList.add('fade-in');
        
        cartItems.appendChild(itemElement);
    });
}

// Atualizar totais do carrinho
function atualizarTotalCarrinho() {
    const subtotalElement = document.getElementById('cartSubtotal');
    const totalElement = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!subtotalElement || !totalElement || !checkoutBtn) return;
    
    const total = carrinho.reduce((soma, item) => soma + (item.price * item.quantidade), 0);
    const totalFormatado = total.toFixed(2).replace('.', ',');
    
    subtotalElement.textContent = `R$${totalFormatado}`;
    totalElement.textContent = `R$${totalFormatado}`;
    
    // Habilitar/desabilitar botão de checkout
    checkoutBtn.disabled = total === 0;
    checkoutBtn.innerHTML = total === 0 
        ? 'Carrinho Vazio' 
        : `<i class="fas fa-lock"></i> Finalizar Compra - R$${totalFormatado}`;
}

// Configurar botões "Adicionar ao Carrinho" na página
function configurarBotoesCarrinho() {
    // Usar event delegation para todos os botões de adicionar
    document.addEventListener('click', function(e) {
        const botao = e.target.closest('.btn-add-to-cart');
        if (!botao) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        // Encontrar o card do produto
        const productCard = botao.closest('[data-id]');
        if (!productCard) return;
        
        const productId = productCard.dataset.id;
        if (!productId) return;
        
        adicionarAoCarrinho(productId, botao);
    });
}

// Configurar eventos para os botões do carrinho (quantidade +/- e remover)
function configurarEventosCarrinho() {
    // Event delegation para botões do carrinho
    document.addEventListener('click', function(e) {
        // Verificar se é um botão de quantidade
        const botaoQuantidade = e.target.closest('.quantity-btn');
        if (botaoQuantidade) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = botaoQuantidade.dataset.id;
            const action = botaoQuantidade.dataset.action;
            
            if (productId && action) {
                atualizarQuantidadeCarrinho(productId, action);
            }
            return;
        }
        
        // Verificar se é botão de remover
        const botaoRemover = e.target.closest('.remove-item');
        if (botaoRemover) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = botaoRemover.dataset.id;
            if (productId) {
                removerDoCarrinho(productId);
            }
            return;
        }
    });
}

// Configurar sidebar do carrinho
function configurarSidebarCarrinho() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const continueShopping = document.getElementById('continueShopping');
    
    // Função para abrir carrinho
    function abrirCarrinho() {
        cartOverlay.classList.add('active');
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderizarCarrinho();
        atualizarTotalCarrinho();
    }
    
    // Função para fechar carrinho
    function fecharCarrinho() {
        cartOverlay.classList.remove('active');
        cartSidebar.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Evento para abrir carrinho
    if (cartIcon) {
        cartIcon.addEventListener('click', abrirCarrinho);
    }
    
    // Eventos para fechar carrinho
    if (cartClose) cartClose.addEventListener('click', fecharCarrinho);
    if (cartOverlay) cartOverlay.addEventListener('click', fecharCarrinho);
    if (continueShopping) {
        continueShopping.addEventListener('click', (e) => {
            e.preventDefault();
            fecharCarrinho();
        });
    }
    
    // Botão de checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        // Preparar mensagem para WhatsApp
        const mensagemWhatsApp = prepararMensagemWhatsApp();
        
        // Número do WhatsApp (altere para o seu número)
        const numeroWhatsApp = '5547996805038'; // Sem o +
        
        // Criar link do WhatsApp
        const whatsappLink = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemWhatsApp)}`;
        
        // Abrir WhatsApp em nova aba
        window.open(whatsappLink, '_blank');
        
        // Opcional: Limpar carrinho após redirecionamento
        // carrinho = [];
        // localStorage.removeItem('carrinho_caru');
        // atualizarContadorCarrinho();
        // renderizarCarrinho();
        // atualizarTotalCarrinho();
    });
}
}

// Mostrar notificação de produto adicionado
function mostrarNotificacao(nomeProduto) {
    // Remover notificações existentes
    const notificacoesAntigas = document.querySelectorAll('.cart-notification');
    notificacoesAntigas.forEach(n => n.remove());
    
    // Criar nova notificação
    const notificacao = document.createElement('div');
    notificacao.className = 'cart-notification';
    notificacao.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <div class="cart-notification-content">
            <div class="cart-notification-title">✓ Adicionado ao carrinho</div>
            <p class="cart-notification-message">${nomeProduto}</p>
        </div>
    `;
    
    document.body.appendChild(notificacao);
    
    // Mostrar notificação
    setTimeout(() => notificacao.classList.add('show'), 10);
    
    // Remover automaticamente após 3 segundos
    setTimeout(() => {
        notificacao.classList.remove('show');
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// Preparar mensagem para WhatsApp
function prepararMensagemWhatsApp() {
    const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    const total = carrinho.reduce((soma, item) => soma + (item.price * item.quantidade), 0);
    
    let mensagem = ` *PEDIDO CARU* \n\n`;
    mensagem += `Olá! Gostaria de fazer um pedido:\n\n`;
    
    carrinho.forEach(item => {
        const precoTotalItem = (item.price * item.quantidade).toFixed(2).replace('.', ',');
        mensagem += `• *${item.name}*\n`;
        mensagem += `  Quantidade: ${item.quantidade}\n`;
        mensagem += `  Preço unitário: R$${item.price.toFixed(2).replace('.', ',')}\n`;
        mensagem += `  Subtotal: R$${precoTotalItem}\n\n`;
    });
    
    mensagem += `═══════════════════════════\n`;
    mensagem += `*Total de itens:* ${totalItens}\n`;
    mensagem += `*Valor total:* R$${total.toFixed(2).replace('.', ',')}\n`;
    mensagem += `═══════════════════════════\n\n`;
    mensagem += `Por favor, confirme a disponibilidade dos produtos e informe as formas de pagamento e entrega.\n\n`;
    mensagem += `Meus dados:\n`;
    mensagem += `Nome: _________\n`;
    mensagem += `Endereço: _________\n`;
    mensagem += `Telefone: _________\n\n`;
    mensagem += `Aguardo seu retorno! `;
    
    return mensagem;
}

// Limpar carrinho após redirecionamento para WhatsApp
function limparCarrinhoAposWhatsApp() {
    // Pequeno atraso para garantir que o WhatsApp abriu
    setTimeout(() => {
        carrinho = [];
        localStorage.removeItem('carrinho_caru');
        atualizarContadorCarrinho();
        renderizarCarrinho();
        atualizarTotalCarrinho();
        fecharCarrinho();
        
        // Feedback ao usuário
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #000;
                color: white;
                padding: 30px 40px;
                border-radius: 12px;
                z-index: 10001;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                animation: fadeIn 0.3s ease;
            ">
                <i class="fas fa-whatsapp" style="font-size: 48px; color: #25D366; margin-bottom: 15px;"></i>
                <h3 style="margin: 0 0 10px 0; color: white;">Pedido Enviado!</h3>
                <p style="margin: 0; opacity: 0.8;">Redirecionando para o WhatsApp...</p>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 500);
}

// Botão de checkout atualizado
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        // Preparar mensagem para WhatsApp
        const mensagemWhatsApp = prepararMensagemWhatsApp();
        
        // Número do WhatsApp (sem o +)
        const numeroWhatsApp = '5547996805038';
        
        // Criar link do WhatsApp
        const whatsappLink = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemWhatsApp)}`;
        
        // Abrir WhatsApp em nova aba
        window.open(whatsappLink, '_blank');
        
        // Limpar carrinho e dar feedback
        limparCarrinhoAposWhatsApp();
    });
}

// ========== FUNÇÕES EXISTENTES DO SITE ==========

// ========== FUNÇÃO PARA GERAR ESTRELAS ✦ ==========

function generateStars() {
    const starsWrapper = document.getElementById('starsWrapper');
    if (!starsWrapper) return;
    
    // Limpar estrelas existentes
    starsWrapper.innerHTML = '';
    
    // Criar 3 camadas de estrelas com diferentes velocidades
    for (let layer = 0; layer < 3; layer++) {
        const starLayer = document.createElement('div');
        starLayer.className = 'star-layer';
        
        // Número de estrelas por camada
        const starsCount = layer === 0 ? 8 : layer === 1 ? 12 : 15;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('span');
            star.className = 'star-particle';
            
            // Aleatorizar tamanho
            const sizeRand = Math.random();
            if (sizeRand < 0.3) star.classList.add('small');
            else if (sizeRand > 0.7) star.classList.add('large');
            else star.classList.add('medium');
            
            // Adicionar emoji de estrela
            star.innerHTML = '✦';
            
            // Aleatorizar atraso da animação
            const delay = Math.random() * 5;
            star.style.animationDelay = `${delay}s`;
            
            // Posicionar aleatoriamente na camada
            star.style.position = 'absolute';
            star.style.left = `${(i / starsCount) * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            starLayer.appendChild(star);
        }
        
        // Configurar animação da camada
        const duration = 20 + layer * 5;
        const delay = layer * 3;
        starLayer.style.animation = `slideStars ${duration}s linear infinite`;
        starLayer.style.animationDelay = `${delay}s`;
        
        starsWrapper.appendChild(starLayer);
    }
}

// ========== CHAMAR A FUNÇÃO QUANDO O DOM CARREGAR ==========

// Gerar estrelas ✦ dinamicamente
// ========== GERAR ESTRELAS ✦ MELHORADO ==========

function generateStars() {
    const starsWrapper = document.getElementById('starsWrapper');
    if (!starsWrapper) return;
    
    // Limpar estrelas existentes
    starsWrapper.innerHTML = '';
    
    // Configurações para cada camada
    const layers = [
        { stars: 25, speed: 15, yPos: 30, delay: 0, reverse: false, sizeRange: [0.8, 1.2] },    // Camada frontal
        { stars: 35, speed: 25, yPos: 50, delay: 1, reverse: false, sizeRange: [0.6, 1.0] },    // Camada do meio
        { stars: 45, speed: 35, yPos: 70, delay: 2, reverse: true, sizeRange: [0.4, 0.8] },     // Camada traseira
        { stars: 20, speed: 20, yPos: 20, delay: 0.5, reverse: false, sizeRange: [0.7, 1.1] },  // Camada diagonal 1
        { stars: 30, speed: 30, yPos: 80, delay: 1.5, reverse: true, sizeRange: [0.5, 0.9] },   // Camada diagonal 2
    ];
    
    layers.forEach((layer, layerIndex) => {
        const starLayer = document.createElement('div');
        starLayer.className = 'star-layer';
        
        // Criar estrelas para esta camada
        for (let i = 0; i < layer.stars; i++) {
            const star = document.createElement('span');
            
            // Determinar tamanho aleatório baseado na camada
            const sizeRand = Math.random();
            let sizeClass = 'medium';
            
            if (sizeRand < 0.2) sizeClass = 'tiny';
            else if (sizeRand < 0.4) sizeClass = 'small';
            else if (sizeRand < 0.6) sizeClass = 'medium';
            else if (sizeRand < 0.8) sizeClass = 'large';
            else sizeClass = 'xlarge';
            
            star.className = `star-particle ${sizeClass}`;
            star.innerHTML = '✦';
            
            // Aleatorizar atraso da animação
            const twinkleDelay = Math.random() * 8;
            star.style.animationDelay = `${twinkleDelay}s`;
            
            // Posicionar aleatoriamente
            const leftPos = Math.random() * 200 - 50; // -50% a 150% para entrada/saída suave
            const topPos = layer.yPos + (Math.random() * 20 - 10); // Variação vertical
            
            star.style.position = 'absolute';
            star.style.left = `${leftPos}%`;
            star.style.top = `${topPos}%`;
            
            // Rotação inicial aleatória
            const initialRotation = Math.random() * 360;
            star.style.transform = `rotate(${initialRotation}deg)`;
            
            // Aleatorizar timing da animação de cintilação
            const twinkleDuration = 3 + Math.random() * 4;
            star.style.animationDuration = `${twinkleDuration}s`;
            
            // Aleatorizar timing function
            const timingFunctions = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)'];
            star.style.animationTimingFunction = timingFunctions[Math.floor(Math.random() * timingFunctions.length)];
            
            starLayer.appendChild(star);
        }
        
        // Configurar animação da camada
        const animationName = layer.reverse ? 'slideStarsReverse' : 'slideStars';
        starLayer.style.animation = `${animationName} ${layer.speed}s linear infinite`;
        starLayer.style.animationDelay = `${layer.delay}s`;
        starLayer.style.top = `${layer.yPos}%`;
        starLayer.style.zIndex = 10 - layerIndex; // Camadas mais próximas têm z-index maior
        
        starsWrapper.appendChild(starLayer);
    });
    
    console.log(`✨ Geradas ${layers.reduce((sum, layer) => sum + layer.stars, 0)} estrelas em ${layers.length} camadas`);
}

// Função para otimizar performance em dispositivos móveis
function optimizeStarsForMobile() {
    const starsWrapper = document.getElementById('starsWrapper');
    if (!starsWrapper) return;
    
    const isMobile = window.innerWidth <= 768;
    
    // Reduzir animações em dispositivos móveis
    if (isMobile) {
        const layers = starsWrapper.querySelectorAll('.star-layer');
        layers.forEach((layer, index) => {
            // Reduzir opacidade geral em mobile
            layer.style.opacity = '0.7';
            
            // Pausar animação se não estiver visível
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        layer.style.animationPlayState = 'running';
                    } else {
                        layer.style.animationPlayState = 'paused';
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(layer);
        });
    }
}

// Inicializar estrelas com otimização
function initStars() {
    generateStars();
    
    // Regenerar estrelas quando a janela for redimensionada
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            generateStars();
            optimizeStarsForMobile();
        }, 250);
    });
    
    // Otimizar para mobile
    optimizeStarsForMobile();
    
    // Recarregar estrelas periodicamente para evitar problemas de renderização
    setInterval(() => {
        generateStars();
    }, 300000); // A cada 5 minutos
}

function initStars() {
    generateStars();
    
    // Regenerar estrelas quando a janela for redimensionada
    window.addEventListener('resize', generateStars);
}

// Adicione esta linha à função init() existente:
function init() {
    console.log('🚀 Inicializando CARU...');
    
    // Inicializar carrinho (código existente)
    atualizarContadorCarrinho();
    configurarBotoesCarrinho();
    // ... resto do código existente ...
    
    // Adicionar esta linha:
    initStars(); // ← Inicializar estrelas
    
    // ... resto do código existente ...
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Scroll animations
function checkVisibility() {
    document.querySelectorAll('.section, .image-favorites, .image-text-section').forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.85) {
            section.classList.add('visible');
            
            section.querySelectorAll('.product-card, .favorite-item').forEach((card, index) => {
                setTimeout(() => card.classList.add('visible'), index * 100);
            });
        }
    });
}

// Menu mobile
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
        
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
}

// Newsletter
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email || !email.includes('@')) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            emailInput.value = '';
            const button = this.querySelector('button');
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.backgroundColor = '';
                alert('Obrigado por se inscrever!');
            }, 1500);
        });
    }
}

// Smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se aberto
                const navLinks = document.getElementById('navLinks');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.querySelector('.menu-toggle i').className = 'fas fa-bars';
                }
            }
        });
    });
}

// Hover effects
function setupProductHoverEffects() {
    document.querySelectorAll('.product-card, .favorite-item, .user-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('product-card') || this.classList.contains('user-card')) {
                this.style.transform = 'translateY(-8px)';
            } else if (this.classList.contains('favorite-item')) {
                this.style.transform = 'translateX(5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Parallax
function setupParallaxEffect() {
    const fullscreenImg = document.querySelector('.fullscreen-img');
    if (fullscreenImg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            fullscreenImg.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0) scale(1.1)`;
        });
    }
}

// Carrossel
function setupCarousel() {
    const carousel = document.getElementById('usersCarousel');
    const prevButton = document.getElementById('carouselPrev');
    const nextButton = document.getElementById('carouselNext');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!carousel || !prevButton || !nextButton || !indicatorsContainer) return;
    
    const cards = carousel.querySelectorAll('.user-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        if (window.innerWidth <= 1200) return 3;
        return 4;
    }
    
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        const cardsPerView = getCardsPerView();
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.setAttribute('data-slide', i);
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    function updateCarousel() {
        const cardsPerView = getCardsPerView();
        const cardWidth = cards[0].offsetWidth + 40;
        carousel.style.transform = `translateX(${-currentIndex * cardWidth * cardsPerView}px)`;
        
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= totalSlides - 1;
    }
    
    function goToSlide(index) {
        const cardsPerView = getCardsPerView();
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        const cardsPerView = getCardsPerView();
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
        } else {
            goToSlide(0);
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    createIndicators();
    updateCarousel();
    
    // Auto-play
    let autoPlayInterval = setInterval(nextSlide, 5000);
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', () => autoPlayInterval = setInterval(nextSlide, 5000));
    
    window.addEventListener('resize', () => {
        createIndicators();
        updateCarousel();
    });
}

// Resize handler
function handleResize() {
    generateStars();
}

// ========== INICIALIZAÇÃO ==========

function init() {
    console.log('🚀 Inicializando CARU...');
    
    // Inicializar carrinho
    atualizarContadorCarrinho();
    configurarBotoesCarrinho();
    configurarEventosCarrinho();
    configurarSidebarCarrinho();
    
    // Outras funcionalidades
    generateStars();
    checkVisibility();
    setupMobileMenu();
    setupNewsletterForm();
    setupSmoothScrolling();
    setupProductHoverEffects();
    setupParallaxEffect();
    setupCarousel();
    
    // Event listeners
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        checkVisibility();
    });
    
    window.addEventListener('resize', handleResize);
    
    // Inicializar carrinho se houver itens
    if (carrinho.length > 0) {
        console.log(`🛒 Carrinho inicial carregado com ${carrinho.length} itens`);
    }
    
    console.log('✅ CARU inicializado com sucesso!');
}

// Iniciar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

