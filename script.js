class WheelGame {
    constructor() {
        this.wheel = document.getElementById('wheel');
        this.spinButton = document.getElementById('spinButton');
        this.isSpinning = false;
        this.resultModal = document.getElementById('resultModal');
        this.prizeName = document.getElementById('prizeName');
        this.fullDiscountCode = document.getElementById('fullDiscountCode');
        this.closeBtn = document.getElementById('closeBtn');
        this.copyBtn = document.getElementById('copyBtn');
        
        this.init();
    }
    
    init() {
        this.spinButton.addEventListener('click', () => this.spin());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.copyBtn.addEventListener('click', () => this.copyCode());
        
        // Modal dışına tıklayınca kapat
        this.resultModal.addEventListener('click', (e) => {
            if (e.target === this.resultModal) {
                this.closeModal();
            }
        });
    }
    
    spin() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        this.spinButton.disabled = true;
        this.spinButton.textContent = 'Dönüyor...';
        
        // Çarkı önce sıfırla (animasyon olmadan)
        this.wheel.style.transition = 'none';
        this.wheel.style.transform = 'rotate(0deg)';
        
        // Kısa bir gecikme sonra animasyonla döndür
        setTimeout(() => {
            this.wheel.style.transition = 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
            
            // Tam 5 tur + rastgele son açı
            const spins = 5; // Sabit 5 tur
            const randomAngle = Math.random() * 360; // Son konum rastgele
            const totalRotation = (spins * 360) + randomAngle;
            
            // Çarkı döndür
            this.wheel.style.transform = `rotate(${totalRotation}deg)`;
            
            // Dönüş bittikten sonra sonucu hesapla
            setTimeout(() => {
                this.calculateResult(totalRotation);
            }, 3000);
        }, 50);
    }
    
    calculateResult(rotation) {
        // Normalize et (0-360 arası)
        const normalizedRotation = ((rotation % 360) + 360) % 360;
        
        // Her bölüm 45 derece (360/8 = 45)
        const sectionAngle = 45;
        
        // Ok yukarıda olduğu için, hangi bölümün üstte kaldığını hesapla
        // Çark saat yönünde döner, ok sabit kalır
        const adjustedRotation = (360 - normalizedRotation) % 360;
        const sectionIndex = Math.floor(adjustedRotation / sectionAngle);
        
        // PNG üzerinde yazılı olan tam isimler (saat yönünde)
        const prizes = [
            'İtalya Turu',      // PNG üst
            'Fransa Turu',      // PNG sağ üst
            'Almanya Turu',     // PNG sağ
            'Lapland Turu',     // PNG sağ alt
            'Fas Turu',         // PNG alt
            'Amerika Turu',     // PNG sol alt
            'Mısır Turu',       // PNG sol (G.A.P değil, Mısır yazıyor)
            'Balkan Turu'       // PNG sol üst
        ];
        
        const prize = prizes[sectionIndex];
        
        this.showResult(prize);
        
        // Butonu tekrar aktif et
        this.isSpinning = false;
        this.spinButton.disabled = false;
        this.spinButton.textContent = 'ÇARKI ÇEVİR!';
    }
    
    showResult(prize) {
        // Benzersiz indirim kodu oluştur
        const discountCode = this.generateDiscountCode();
        
        // Modal içeriğini güncelle
        this.prizeName.textContent = prize;
        this.fullDiscountCode.textContent = 'PRONTO' + discountCode;
        
        // Modal'ı göster
        this.resultModal.classList.add('show');
        
        // Konfeti efekti
        this.createConfetti();
    }
    
    generateDiscountCode() {
        // 6 haneli rastgele sayı oluştur
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    
    closeModal() {
        this.resultModal.classList.remove('show');
    }
    
    copyCode() {
        const fullCode = this.fullDiscountCode.textContent;
        
        // Kopyalama işlemi
        navigator.clipboard.writeText(fullCode).then(() => {
            // Başarılı kopyalama mesajı
            const originalText = this.copyBtn.textContent;
            this.copyBtn.textContent = 'Kopyalandı!';
            this.copyBtn.style.background = '#2ed573';
            
            setTimeout(() => {
                this.copyBtn.textContent = originalText;
                this.copyBtn.style.background = '#2ed573';
            }, 2000);
        }).catch(() => {
            // Fallback: eski tarayıcılar için
            const textArea = document.createElement('textarea');
            textArea.value = fullCode;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalText = this.copyBtn.textContent;
            this.copyBtn.textContent = 'Kopyalandı!';
            this.copyBtn.style.background = '#2ed573';
            
            setTimeout(() => {
                this.copyBtn.textContent = originalText;
                this.copyBtn.style.background = '#2ed573';
            }, 2000);
        });
    }
    
    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#ff4757', '#2ed573', '#ffa502', '#ff6348', '#ff3838', '#ff9ff3', '#54a0ff', '#5f27cd', '#ffd700', '#ff1493', '#00ff00', '#ff4500', '#8a2be2', '#00bfff'];
        
        // İlk patlama - %50 yazıları fışkırıyor
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                
                // %50 yazısı oluştur
                confetti.textContent = '%50';
                confetti.style.fontSize = (Math.random() * 20 + 20) + 'px'; // 20-40px arası
                confetti.style.fontWeight = 'bold';
                confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.fontFamily = 'Arial, sans-serif';
                confetti.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
                
                // Merkezden başla
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                confetti.style.left = centerX + 'px';
                confetti.style.top = centerY + 'px';
                
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                
                // Rastgele yön ve hız
                const angle = Math.random() * 360;
                const velocity = Math.random() * 250 + 200; // 200-450px (daha hızlı)
                const angleRad = (angle * Math.PI) / 180;
                const endX = Math.cos(angleRad) * velocity;
                const endY = Math.sin(angleRad) * velocity;
                
                confetti.style.animation = `confettiExplosion 3s ease-out forwards`;
                confetti.style.setProperty('--endX', endX + 'px');
                confetti.style.setProperty('--endY', endY + 'px');
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 15); // Daha hızlı patlama
        }
        
        // İkinci patlama - daha fazla %50 yazısı
        setTimeout(() => {
            for (let i = 0; i < 60; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.style.position = 'fixed';
                    
                    // %50 yazısı oluştur
                    confetti.textContent = '%50';
                    confetti.style.fontSize = (Math.random() * 15 + 15) + 'px'; // 15-30px arası
                    confetti.style.fontWeight = 'bold';
                    confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.fontFamily = 'Arial, sans-serif';
                    confetti.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
                    confetti.style.left = Math.random() * window.innerWidth + 'px';
                    confetti.style.top = '-30px';
                    confetti.style.pointerEvents = 'none';
                    confetti.style.zIndex = '1000';
                    confetti.style.animation = 'confettiFall 3s linear forwards';
                    
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 3000);
                }, i * 25);
            }
        }, 300);
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
    
    @keyframes confettiExplosion {
        0% {
            transform: translate(0, 0) rotate(0deg) scale(0.3);
            opacity: 1;
        }
        15% {
            transform: translate(calc(var(--endX) * 0.15), calc(var(--endY) * 0.15)) rotate(54deg) scale(1.3);
            opacity: 1;
        }
        30% {
            transform: translate(calc(var(--endX) * 0.3), calc(var(--endY) * 0.3)) rotate(108deg) scale(1.6);
            opacity: 0.9;
        }
        50% {
            transform: translate(calc(var(--endX) * 0.5), calc(var(--endY) * 0.5)) rotate(180deg) scale(1.4);
            opacity: 0.8;
        }
        70% {
            transform: translate(calc(var(--endX) * 0.7), calc(var(--endY) * 0.7)) rotate(252deg) scale(1.1);
            opacity: 0.6;
        }
        85% {
            transform: translate(calc(var(--endX) * 0.85), calc(var(--endY) * 0.85)) rotate(306deg) scale(0.8);
            opacity: 0.4;
        }
        100% {
            transform: translate(var(--endX), var(--endY)) rotate(360deg) scale(0.2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Helper: center discount badges under person illustrations
function alignDiscountBadges() {
	const leftImg = document.querySelector('.side-illustration');
	const rightImg = document.querySelector('.side-illustration-right');
	const leftBadge = document.querySelector('.left-discount');
	const rightBadge = document.querySelector('.right-discount');

	const setBadge = (imgEl, badgeEl) => {
		if (!imgEl || !badgeEl) return;
		const styles = window.getComputedStyle(imgEl);
		if (styles.display === 'none' || styles.visibility === 'hidden') {
			badgeEl.style.display = 'none';
			return;
		}
		badgeEl.style.display = '';
		const rect = imgEl.getBoundingClientRect();
		const pageXCenter = rect.left + rect.width / 2 + window.scrollX;
		badgeEl.style.left = pageXCenter + 'px';
		// IMPORTANT: keep existing CSS transform (translateX + scale) – do not overwrite here
	};

	setBadge(leftImg, leftBadge);
	setBadge(rightImg, rightBadge);
}

// Re-align on events
window.addEventListener('load', alignDiscountBadges);
window.addEventListener('resize', alignDiscountBadges);

function positionOverlayLogos() {
	const leftImg = document.querySelector('.side-illustration');
	const rightImg = document.querySelector('.side-illustration-right');
	const leftLogo = document.querySelector('.left-overlay-logo');
	const rightLogo = document.querySelector('.right-overlay-logo');

	const place = (img, logo, options = {}) => {
		if (!img || !logo) return;
		const st = window.getComputedStyle(img);
		if (st.display === 'none' || st.visibility === 'hidden') {
			logo.style.display = 'none';
			return;
		}
		logo.style.display = '';
		const rect = img.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2 + window.scrollX;
		const topY = rect.top + rect.height * 0.18 + window.scrollY;
		// default positions
		let targetLeft = centerX;
		let targetTop = topY - 110;
		// allow horizontal override
		if (options.overrideLeft !== undefined) {
			targetLeft = options.overrideLeft(rect);
		}
		// keep top if requested
		if (options.keepTop === true) {
			const currentTop = parseFloat(logo.style.top);
			if (!Number.isNaN(currentTop)) targetTop = currentTop;
		}
		logo.style.left = targetLeft + 'px';
		logo.style.top = targetTop + 'px';
	};

	// Left logo: center horizontally to woman's image; keep current top, then shift 60px left
	place(leftImg, leftLogo, {
		overrideLeft: (r) => r.left + r.width / 2 + window.scrollX - 60,
		keepTop: true
	});
	// Right logo: keep centered above person, then shift 30px right
	place(rightImg, rightLogo, {
		overrideLeft: (r) => r.left + r.width / 2 + window.scrollX + 30,
		keepTop: true
	});
}

window.addEventListener('load', positionOverlayLogos);
window.addEventListener('resize', positionOverlayLogos);


// Oyunu başlat
document.addEventListener('DOMContentLoaded', () => {
    new WheelGame();
});

// Sayfa yüklendiğinde hoş geldin mesajı kaldırıldı
