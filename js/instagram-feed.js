// Instagram Feed Integration
class InstagramFeed {
    constructor() {
        this.accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN'; // Você precisará substituir isso pelo seu token de acesso
        this.userId = 'YOUR_INSTAGRAM_USER_ID'; // Você precisará substituir isso pelo seu ID de usuário
        this.feedContainer = document.getElementById('instagram-feed');
        this.init();
    }

    async init() {
        try {
            const posts = await this.fetchInstagramPosts();
            this.renderPosts(posts);
        } catch (error) {
            console.error('Erro ao carregar posts do Instagram:', error);
            this.showError();
        }
    }

    async fetchInstagramPosts() {
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${this.accessToken}&limit=6`
        );
        
        if (!response.ok) {
            throw new Error('Falha ao buscar posts do Instagram');
        }

        const data = await response.json();
        return data.data;
    }

    renderPosts(posts) {
        this.feedContainer.innerHTML = posts.map(post => {
            const imageUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
            return `
                <a href="${post.permalink}" class="instagram-item" target="_blank" rel="noopener">
                    <img src="${imageUrl}" alt="${post.caption || 'Instagram Post - Espaço Daiane Alves'}" width="200" height="200">
                    <div class="instagram-overlay">
                        <i class="fab fa-instagram"></i>
                    </div>
                </a>
            `;
        }).join('');
    }

    showError() {
        this.feedContainer.innerHTML = `
            <div class="instagram-error">
                <p>Não foi possível carregar os posts do Instagram no momento.</p>
                <p>Por favor, visite nosso perfil diretamente: 
                    <a href="https://www.instagram.com/espacodaianealves" target="_blank" rel="noopener">
                        @espacodaianealves
                    </a>
                </p>
            </div>
        `;
    }
}

// Inicializa o feed quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new InstagramFeed();
}); 