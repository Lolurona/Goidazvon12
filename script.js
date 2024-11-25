document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Download button click tracking
    const downloadButton = document.querySelector('.download-button');
    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => {
            console.log('Download initiated');
            // Here you can add analytics tracking if needed
        });
    }

    // Добавляем летающие Z
    setInterval(createFloatingZ, 2000);
    
    // Добавляем звук при нажатии на Z
    document.querySelectorAll('.z-symbol').forEach(z => {
        z.addEventListener('click', () => {
            playRandomSound();
        });
    });

    // Эффект тряски при наведении на мемы
    document.querySelectorAll('.meme-card').forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.animation = 'shake 0.5s infinite';
        });
        card.addEventListener('mouseout', () => {
            card.style.animation = '';
        });
    });

    // Радужный эффект для текста
    const texts = document.querySelectorAll('h1, h2, h3, .hero-text');
    texts.forEach(text => {
        text.addEventListener('mouseover', () => {
            text.style.animation = 'rainbow 2s infinite';
        });
        text.addEventListener('mouseout', () => {
            text.style.animation = '';
        });
    });

    // Создаем падающие буквы Z
    function createFloatingZ() {
        const z = document.createElement('div');
        z.className = 'falling-z';
        z.style.left = Math.random() * window.innerWidth + 'px';
        z.innerHTML = Math.random() > 0.5 ? 'Z' : 'V';
        document.body.appendChild(z);
        
        setTimeout(() => {
            z.remove();
        }, 5000);
    }

    // Случайные звуки при клике на Z
    function playRandomSound() {
        const sounds = [
            'УРА!',
            'ГОЙДА!',
            'ZА ПОБЕДУ!',
            'ВПЕРЁД!'
        ];
        const sound = sounds[Math.floor(Math.random() * sounds.length)];
        const audio = new SpeechSynthesisUtterance(sound);
        audio.lang = 'ru-RU';
        audio.volume = 0.5;
        window.speechSynthesis.speak(audio);
    }

    // Эффект печатной машинки для текста
    document.querySelectorAll('.feature p').forEach(p => {
        const text = p.textContent;
        p.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                p.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(p);
    });

    // Добавляем курсор в виде Z
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Эффект для кнопки скачивания
    const downloadButton = document.getElementById('downloadButton');
    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Создаем большую букву Z
            const bigZ = document.createElement('div');
            bigZ.className = 'mega-z';
            bigZ.textContent = 'Z';
            document.body.appendChild(bigZ);
            
            // Играем звук
            const audio = new SpeechSynthesisUtterance('ЗА РОДИНУ!');
            audio.lang = 'ru-RU';
            audio.volume = 1;
            window.speechSynthesis.speak(audio);
            
            // Через 2 секунды редиректим
            setTimeout(() => {
                window.location.href = 'https://contract.gosuslugi.ru/';
            }, 2000);
        });
    }

    // Функция для загрузки изображений из папки img
    function loadImagesFromFolder() {
        const imageContainer = document.querySelector('.memes-grid');
        if (!imageContainer) {
            console.error('Контейнер .memes-grid не найден');
            return;
        }

        // Очищаем существующие карточки
        imageContainer.innerHTML = '';

        // Список изображений
        const images = [
            { file: 'photo_3_2024-11-23_23-05-14.jpg', title: 'ZОV', text: 'ВПЕРЁД К ПОБЕДЕ!' },
            { file: 'photo_4_2024-11-23_23-05-14.jpg', title: 'ZИЛА V ПРАВДЕ', text: 'ZВОИХ НЕ БРОZАЕМ!' },
            { file: 'photo_5_2024-11-23_23-05-14.jpg', title: 'РОZZИЯ', text: 'ВМЕZТЕ МЫ ZИЛА!' }
        ];

        // Создаем карточки для каждого изображения
        images.forEach((img) => {
            const memeCard = document.createElement('div');
            memeCard.className = 'meme-card';
            memeCard.innerHTML = `
                <div class="meme-image-container">
                    <img src="img/${img.file}" alt="${img.title}" class="meme-image">
                    <div class="meme-overlay"></div>
                </div>
                <div class="meme-content">
                    <h3>${img.title} <span class="z-symbol">Z</span></h3>
                    <p>${img.text}</p>
                    <div class="meme-tags">
                        <span class="meme-tag">ZОV</span>
                        <span class="meme-tag">ПОБЕДА</span>
                    </div>
                </div>
            `;
            imageContainer.appendChild(memeCard);

            // Добавляем эффект тряски
            memeCard.addEventListener('mouseover', () => {
                memeCard.style.animation = 'shake 0.5s infinite';
            });
            memeCard.addEventListener('mouseout', () => {
                memeCard.style.animation = '';
            });
        });
    }

    // Загружаем изображения при загрузке страницы
    loadImagesFromFolder();
});
