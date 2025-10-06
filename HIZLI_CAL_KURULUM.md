# Cal.com Hızlı Kurulum (2 Dakika)

## 1. Hesap Aç
👉 **https://cal.com/signup** adresine git
- "Sign up with Google" tıkla
- **aliemredag@gmail.com** seç
- Username olarak: **ali-emre-dag** yaz (veya otomatik önerileni seç)

## 2. Google Calendar Bağla
- Sol menüden **"Apps"** tıkla
- **"Google Calendar"** bul
- **"Connect"** butonuna tıkla
- İzinleri onayla

## 3. Event Types Oluştur

### İlk Event (15 dakika):
1. Dashboard'da **"Event Types"** tıkla
2. **"+ New Event Type"** tıkla
3. Ayarlar:
   - **Title**: `Quick Introduction Call`
   - **URL slug**: `15min` (otomatik olacak: cal.com/ali-emre-dag/15min)
   - **Duration**: `15 minutes`
   - **Location**: `Google Meet`
4. **"Continue"** ve **"Create"** tıkla

### İkinci Event (30 dakika):
1. **"+ New Event Type"** tıkla
2. Ayarlar:
   - **Title**: `Supply Chain Consultation`
   - **URL slug**: `30min`
   - **Duration**: `30 minutes`
   - **Location**: `Google Meet`
3. **"Create"** tıkla

### Üçüncü Event (60 dakika):
1. **"+ New Event Type"** tıkla
2. Ayarlar:
   - **Title**: `Strategy Workshop Session`
   - **URL slug**: `60min`
   - **Duration**: `60 minutes`
   - **Location**: `Google Meet`
3. **"Create"** tıkla

## 4. Availability Ayarla
1. Sol menüden **"Availability"** tıkla
2. **Timezone**: `Europe/Istanbul` seç
3. **Working Hours** ayarla (örn: 9:00 - 18:00, Pazartesi-Cuma)
4. **"Save"** tıkla

## ✅ Tamamdır!

Artık sisteminiz hazır. Portfolio sitenizde **"Book Now"** butonuna tıkladığınızda Cal.com booking penceresi açılacak.

**Test için**: http://localhost:3000 adresine gidin, aşağı scroll edin, "Book Consultation" bölümünde bir butona tıklayın.

## Önemli Notlar:
- Cal.com link'leriniz:
  - https://cal.com/ali-emre-dag/15min
  - https://cal.com/ali-emre-dag/30min
  - https://cal.com/ali-emre-dag/60min
- Bu link'ler zaten kodda ayarlandı ✅
- Eğer farklı bir username seçtiyseniz, `calendar-booking.tsx` dosyasında `ali-emre-dag` kısmını değiştirin
