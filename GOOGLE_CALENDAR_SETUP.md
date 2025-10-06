# Google Calendar API Setup Rehberi

## Adım 1: Google Cloud Console'da Proje Oluşturma

1. **Google Cloud Console'a gidin**: https://console.cloud.google.com/
2. Sağ üst köşeden yeni proje oluşturun veya mevcut projeyi seçin
3. Proje adı: "Ali Emre Portfolio" (veya istediğiniz isim)

## Adım 2: Google Calendar API'yi Aktifleştirme

1. Sol menüden **"APIs & Services" > "Library"** seçin
2. Arama kutusuna **"Google Calendar API"** yazın
3. **"Google Calendar API"** seçin ve **"Enable"** butonuna tıklayın

## Adım 3: Service Account Oluşturma

1. Sol menüden **"APIs & Services" > "Credentials"** seçin
2. Üstten **"+ CREATE CREDENTIALS"** > **"Service Account"** seçin
3. Service account detayları:
   - **Name**: "Portfolio Calendar Service"
   - **ID**: otomatik oluşur
   - **Role**: "Project" > "Editor"
4. **"Done"** butonuna tıklayın

## Adım 4: JSON Key Dosyası İndirme

1. Oluşturduğunuz Service Account'a tıklayın
2. **"Keys"** sekmesine gidin
3. **"Add Key" > "Create New Key"** seçin
4. **"JSON"** formatını seçin
5. **"Create"** butonuna tıklayın
6. JSON dosyası otomatik indirilecek

## Adım 5: JSON Key'i Projeye Ekleme

1. İndirilen JSON dosyasını projenizin root dizinine kopyalayın
2. Dosya adını **`google-credentials.json`** olarak değiştirin
3. `.gitignore` dosyasına eklenmiş olduğundan emin olun

## Adım 6: Service Account'u Calendar'a Ekleyin

1. **Google Calendar**'ınıza gidin: https://calendar.google.com
2. Sol taraftan kullanmak istediğiniz calendar'ı seçin
3. Calendar ayarlarına gidin (üç nokta > Settings and sharing)
4. **"Share with specific people"** bölümüne gidin
5. **"+ Add people"** butonuna tıklayın
6. Service account email'ini ekleyin:
   - Email, JSON dosyasındaki `client_email` alanında bulunur
   - Örnek: `portfolio-calendar-service@project-id.iam.gserviceaccount.com`
7. İzin seviyesi: **"Make changes to events"** seçin
8. **"Send"** butonuna tıklayın

## Adım 7: Calendar ID'yi Alın

1. Aynı calendar ayarları sayfasında
2. **"Integrate calendar"** bölümünü bulun
3. **"Calendar ID"** kopyalayın
   - Kişisel calendar için genelde: `your-email@gmail.com`
   - Özel calendar için: `random-string@group.calendar.google.com`

## Adım 8: .env.local Dosyasını Güncelleyin

Projenizin root dizinindeki `.env.local` dosyasına şunları ekleyin:

```env
# Google Calendar API
GOOGLE_CALENDAR_ID=your-calendar-id@gmail.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=portfolio-calendar-service@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Not**:
- `GOOGLE_PRIVATE_KEY` için JSON dosyasındaki `private_key` değerini kopyalayın
- Tırnak içinde olmalı ve `\n` karakterleri korunmalı

## Adım 9: Test Edin

1. Dev server'ı yeniden başlatın: `npm run dev`
2. Booking sayfasına gidin
3. Bir randevu oluşturmayı deneyin
4. Google Calendar'ınızı kontrol edin

## Güvenlik Notları

✅ `google-credentials.json` dosyası `.gitignore`'da olmalı
✅ `.env.local` dosyası asla commit edilmemeli
✅ Production'da environment variables kullanın (Vercel'de)
✅ Service Account sadece calendar erişimine sahip olmalı

## Sorun Giderme

**"Permission denied" hatası alıyorsanız:**
- Service account email'i calendar'a eklenmiş mi kontrol edin
- İzin seviyesi "Make changes to events" olmalı

**"Invalid credentials" hatası:**
- `.env.local` dosyasındaki değerleri kontrol edin
- `GOOGLE_PRIVATE_KEY` formatı doğru mu?
- Dev server'ı yeniden başlattınız mı?

**"Calendar not found" hatası:**
- `GOOGLE_CALENDAR_ID` doğru mu?
- Calendar paylaşımı aktif mi?
