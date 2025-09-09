class WheelGame {
    constructor() {
        this.wheel = document.getElementById('wheel');
        this.spinButton = document.getElementById('spinButton');
        this.result = document.getElementById('result');
        this.prizeList = document.getElementById('prizeList');
        this.isSpinning = false;
        this.prizes = [];
        this.totalSpins = 0;
        
        this.init();
    }
    
    init() {
        this.spinButton.addEventListener('click', () => this.spin());
        this.updatePrizeHistory();
    }
    
    spin() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        this.spinButton.disabled = true;
        this.spinButton.textContent = 'Dönüyor...';
        this.result.textContent = '';
        
        // Rastgele dönüş açısı (en az 5 tam tur + rastgele açı)
        const minSpins = 5;
        const maxSpins = 8;
        const spins = Math.random() * (maxSpins - minSpins) + minSpins;
        const randomAngle = Math.random() * 360;
        const totalRotation = (spins * 360) + randomAngle;
        
        // Çarkı döndür
        this.wheel.style.transform = `rotate(${totalRotation}deg)`;
        
        // Dönüş bittikten sonra sonucu hesapla
        setTimeout(() => {
            this.calculateResult(totalRotation);
        }, 4000);
    }
    
    calculateResult(rotation) {
        // Normalize et (0-360 arası)
        const normalizedRotation = ((rotation % 360) + 360) % 360;
        
        // Her bölüm 45 derece (360/8 = 45)
        const sectionAngle = 45;
        const sectionIndex = Math.floor(normalizedRotation / sectionAngle);
        
        // Bölümleri al
        const sections = document.querySelectorAll('.wheel-section');
        const winningSection = sections[7 - sectionIndex]; // Ters sırada hesapla
        const prize = winningSection.getAttribute('data-prize');
        
        this.showResult(prize);
        this.addToHistory(prize);
        
        // Butonu tekrar aktif et
        this.isSpinning = false;
        this.spinButton.disabled = false;
        this.spinButton.textContent = 'ÇARKI ÇEVİR!';
        this.totalSpins++;
    }
    
    showResult(prize) {
        this.result.innerHTML = `
            <div style="animation: bounce 0.6s ease-in-out;">
                🎉 Tebrikler! 🎉<br>
                <strong>${prize}</strong> kazandınız!
            </div>
        `;
        
        // Özel animasyon ekle
        this.result.style.animation = 'none';
        setTimeout(() => {
            this.result.style.animation = 'bounce 0.6s ease-in-out';
        }, 10);
        
        // Konfeti efekti (basit)
        this.createConfetti();
    }
    
    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                confetti.style.animation = 'confettiFall 3s linear forwards';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 50);
        }
    }
    
    addToHistory(prize) {
        const timestamp = new Date().toLocaleTimeString('tr-TR');
        this.prizes.unshift({
            prize: prize,
            time: timestamp
        });
        
        // Sadece son 10 ödülü göster
        if (this.prizes.length > 10) {
            this.prizes = this.prizes.slice(0, 10);
        }
        
        this.updatePrizeHistory();
    }
    
    updatePrizeHistory() {
        this.prizeList.innerHTML = '';
        
        if (this.prizes.length === 0) {
            this.prizeList.innerHTML = '<li style="opacity: 0.7;">Henüz ödül kazanmadınız</li>';
            return;
        }
        
        this.prizes.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span style="font-weight: bold;">${item.prize}</span> 
                <span style="opacity: 0.7; font-size: 0.9em;">- ${item.time}</span>
            `;
            this.prizeList.appendChild(li);
        });
    }
}

// CSS animasyonları ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Oyunu başlat
document.addEventListener('DOMContentLoaded', () => {
    new WheelGame();
});

// Sayfa yüklendiğinde hoş geldin mesajı
window.addEventListener('load', () => {
    setTimeout(() => {
        const result = document.getElementById('result');
        result.innerHTML = '🎯 Çarkı çevir ve şansını dene! 🎯';
    }, 1000);
});
