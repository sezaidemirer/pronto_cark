# 🎁 Hediye Çarkı Oyunu

Bu proje, kullanıcıların çarkı çevirerek çeşitli hediyeler kazanabileceği interaktif bir web oyunudur.

## 🎮 Özellikler

- **Dönen Çark**: 8 farklı bölümlü renkli çark
- **Çeşitli Ödüller**: 100 TL, 50 TL, 25 TL, 10 TL, 5 TL ve "Tekrar Dene" seçenekleri
- **Smooth Animasyonlar**: CSS3 ile yumuşak dönüş animasyonları
- **Konfeti Efekti**: Kazanma anında görsel efekt
- **Ödül Geçmişi**: Kazanılan ödüllerin listesi
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

## 🚀 Canlı Demo

[GitHub Pages'te Görüntüle](https://yourusername.github.io/çark)

## 🛠️ Teknolojiler

- **HTML5**: Yapısal markup
- **CSS3**: Styling ve animasyonlar
- **JavaScript (ES6+)**: Oyun mantığı ve etkileşimler

## 📁 Dosya Yapısı

```
çark/
├── index.html          # Ana HTML dosyası
├── style.css           # CSS stilleri
├── script.js           # JavaScript oyun mantığı
└── README.md           # Proje dokümantasyonu
```

## 🎯 Nasıl Oynanır

1. "ÇARKI ÇEVİR!" butonuna tıklayın
2. Çark döner ve rastgele bir bölümde durur
3. Kazandığınız ödül ekranda gösterilir
4. Ödül geçmişinizde kaydedilir

## 🎨 Özelleştirme

### Ödülleri Değiştirme
`index.html` dosyasındaki `data-prize` değerlerini değiştirerek ödülleri özelleştirebilirsiniz:

```html
<div class="wheel-section" data-prize="YENİ ÖDÜL">YENİ ÖDÜL</div>
```

### Renkleri Değiştirme
`style.css` dosyasındaki `.wheel-section:nth-child()` seçicilerinde renkleri değiştirebilirsiniz:

```css
.wheel-section:nth-child(1) { background: #YENİRENK; }
```

## 📱 Responsive Tasarım

Oyun tüm cihazlarda çalışacak şekilde tasarlanmıştır:
- **Masaüstü**: 300x300px çark
- **Mobil**: 250x250px çark
- **Tablet**: Otomatik boyutlandırma

## 🔧 Yerel Geliştirme

1. Projeyi klonlayın:
```bash
git clone https://github.com/yourusername/çark.git
```

2. Proje dizinine gidin:
```bash
cd çark
```

3. `index.html` dosyasını tarayıcıda açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 İletişim

Proje hakkında sorularınız için issue açabilirsiniz.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
