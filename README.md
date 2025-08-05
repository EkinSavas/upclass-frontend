# UpClass - Modern Eğitim Platformu

UpClass, TÜBİTAK destekli CanlıDers+ projesinin modern frontend uygulamasıdır. Next.js, React, TypeScript ve Tailwind CSS kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### 👨‍🏫 Öğretmen Paneli
- **Ders Yönetimi**: Canlı ders başlatma/bitirme
- **Öğrenci Takibi**: Anlık katılım ve dikkat seviyesi takibi
- **Quiz Sistemi**: Gerçek zamanlı quiz oluşturma ve yayınlama
- **Görsel Geri Bildirim**: Renkli etkileşim durumu göstergeleri

### 👨‍🎓 Öğrenci Paneli
- **Ders Katılımı**: Zoom/Meet entegrasyonu ile ders katılımı
- **Quiz Cevaplama**: Gerçek zamanlı quiz cevaplama ekranı
- **Dikkat Pingleri**: Etkileşim uyarıları ve dikkat takibi
- **Gelişim Özeti**: XP, süre, dikkat ve quiz başarı takibi
- **Çalışma Modu**: Sosyal motivasyon ile çalışma modu

### 🌍 Çalışma Modülü (Sosyal Motivasyon)
- **Çalışma Sayacı**: "Şu an kaç kişi çalışıyor" göstergesi
- **Süre Takibi**: Çalışma süresi ve aktiflik analizi
- **Suistimal Önleme**: Sekme dışına çıkma kontrolü
- **Ping Sistemi**: Random ping butonları

### 🏆 Gamification Modülü
- **XP Sistemi**: Deneyim puanı ve seviye sistemi
- **Rozet Sistemi**: Başarı rozetleri ve ödüller
- **Günlük Görevler**: Günlük hedefler ve görevler
- **Sıralama**: Haftalık sıralama listesi

### 👨‍👩‍👧‍👦 Veli Paneli
- **Haftalık Raporlar**: Ders katılım grafikleri
- **Başarı Takibi**: Quiz başarı ortalamaları
- **E-posta Bildirimleri**: Otomatik rapor gönderimi

## 🛠️ Teknolojiler

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State Management**: React Hooks
- **UI Components**: Headless UI

## 📦 Kurulum

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd upclass_fe
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcıda açın:**
```
http://localhost:3000
```

## 🏗️ Proje Yapısı

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global stiller
│   ├── layout.tsx      # Ana layout
│   └── page.tsx        # Ana sayfa
├── components/          # Yeniden kullanılabilir bileşenler
├── lib/                # Utility fonksiyonları
│   └── utils.ts        # Ortak yardımcı fonksiyonlar
└── types/              # TypeScript tip tanımları
    └── index.ts        # Ana tip tanımları
```

## 🎯 Kullanım

### Öğretmen Paneli
1. **Ders Başlatma**: "Dersi Başlat" butonuna tıklayın
2. **Öğrenci Takibi**: Öğrenci listesinden dikkat seviyelerini izleyin
3. **Quiz Yayınlama**: "Quiz Başlat" ile anlık quiz oluşturun
4. **Ders Sonlandırma**: "Dersi Bitir" ile dersi kapatın

### Öğrenci Paneli
1. **Çalışma Modu**: "Çalışmaya Başla" ile sosyal çalışma moduna geçin
2. **Gelişim Takibi**: XP, seviye ve başarılarınızı görün
3. **Quiz Katılımı**: Aktif quizlere katılın ve cevaplayın

### Veli Paneli
1. **Rapor Görüntüleme**: Haftalık gelişim raporlarını inceleyin
2. **Başarı Takibi**: Quiz başarısı ve katılım oranlarını görün

## 🔧 Geliştirme

### Yeni Özellik Ekleme
1. İlgili tip tanımlarını `src/types/index.ts` dosyasına ekleyin
2. Bileşenleri `src/components/` dizinine ekleyin
3. Utility fonksiyonlarını `src/lib/utils.ts` dosyasına ekleyin

### Stil Güncellemeleri
- Tailwind CSS sınıflarını kullanın
- `src/app/globals.css` dosyasında özel stiller tanımlayın
- Framer Motion ile animasyonlar ekleyin

## 📋 Task Manager Durumu

### ✅ Tamamlanan Görevler
- [x] Next.js projesi başlat
- [x] TypeScript yapılandırması
- [x] Tailwind CSS kurulumu
- [x] ESLint entegrasyonu
- [x] Route mimarisi (App Router)
- [x] Öğretmen paneli temel arayüzü
- [x] Öğrenci paneli temel arayüzü
- [x] Veli paneli temel arayüzü
- [x] Quiz sistemi temel yapısı
- [x] Çalışma modu temel yapısı
- [x] Gamification temel yapısı
- [x] Modern UI/UX tasarımı

### 🔄 Devam Eden Görevler
- [ ] Gerçek zamanlı bildirimler (Socket.io)
- [ ] Firebase/Supabase entegrasyonu
- [ ] Zoom/Google Meet entegrasyonu
- [ ] Authentication sistemi
- [ ] Backend API entegrasyonu

### 📝 Planlanan Görevler
- [ ] Gelişmiş quiz sistemi
- [ ] Detaylı raporlama
- [ ] E-posta bildirim sistemi
- [ ] Mobil uygulama
- [ ] Çoklu dil desteği

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje TÜBİTAK destekli CanlıDers+ projesi kapsamında geliştirilmiştir.

## 📞 İletişim

Proje ekibi ile iletişime geçmek için:
- Email: [proje-email@domain.com]
- GitHub: [repository-url]

---

**UpClass** - Modern eğitim platformu ile geleceğin öğrenme deneyimini keşfedin! 🚀
