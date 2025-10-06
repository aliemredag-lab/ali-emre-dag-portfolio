# Cal.com Setup Rehberi

Cal.com ile randevu sistemini entegre etmek çok kolay! İşte adım adım rehber:

## 1. Cal.com Hesabı Oluşturma

1. **Cal.com'a kayıt olun**: https://cal.com/signup
   - Ücretsiz hesap tamamen yeterli
   - Google ile giriş yapabilirsiniz

2. **Google Calendar'ınızı bağlayın**:
   - Dashboard'da "Connected Calendars" bölümüne gidin
   - "Connect" > "Google Calendar" seçin
   - İzinleri onaylayın

## 2. Event Types Oluşturma

Üç farklı event type oluşturmanız gerekiyor:

### Event 1: Quick Introduction (15 dakika)
1. Dashboard'da "Event Types" > "+ New Event Type" tıklayın
2. Ayarlar:
   - **Title**: "Quick Introduction Call"
   - **URL/Slug**: `15min` (örnek: cal.com/aliemredag/15min)
   - **Duration**: 15 minutes
   - **Location**: Google Meet veya Zoom
   - **Description**: "Quick intro to discuss your supply chain needs"

### Event 2: Supply Chain Consultation (30 dakika)
1. "+ New Event Type" tıklayın
2. Ayarlar:
   - **Title**: "Supply Chain Consultation"
   - **URL/Slug**: `30min`
   - **Duration**: 30 minutes
   - **Location**: Google Meet
   - **Description**: "In-depth consultation on supply chain optimization"

### Event 3: Strategy Workshop (60 dakika)
1. "+ New Event Type" tıklayın
2. Ayarlar:
   - **Title**: "Strategy Workshop Session"
   - **URL/Slug**: `60min`
   - **Duration**: 60 minutes
   - **Location**: Google Meet
   - **Description**: "Comprehensive workshop for supply chain strategy"

## 3. Availability Ayarları

1. **"Availability"** sekmesine gidin
2. Çalışma saatlerinizi ayarlayın:
   - **Timezone**: Europe/Istanbul
   - **Working Hours**:
     - Monday - Friday: 9:00 AM - 6:00 PM
     - (İstediğiniz gibi özelleştirin)
3. Buffer zamanı ekleyin (opsiyonel):
   - Before events: 5-10 minutes
   - After events: 5-10 minutes

## 4. Cal.com Link'lerini Portfolio'ya Ekleme

Her event type için Cal.com link'iniz şu formatta olacak:
```
cal.com/[username]/[event-slug]
```

Örnek:
- `cal.com/aliemredag/15min`
- `cal.com/aliemredag/30min`
- `cal.com/aliemredag/60min`

**Link'lerinizi kopyalayıp `/components/sections/calendar-booking.tsx` dosyasında güncelleyin:**

```typescript
calendlyUrl: 'aliemredag/15min'  // Sadece username/slug kısmı yeterli
```

## 5. Özelleştirme (Opsiyonel)

### Branding
1. Settings > Appearance
2. Brand color, logo ekleyebilirsiniz

### Email Notifications
1. Settings > Workflows
2. Otomatik email hatırlatıcıları ayarlayın:
   - 24 saat önceden
   - 1 saat önceden
   - Meeting sonrası thank you email

### Custom Questions
Her event type için özel sorular ekleyebilirsiniz:
- Company name
- Project scope
- Specific challenges

## 6. Test Etme

1. Portfolio sitenizde "Book Now" butonuna tıklayın
2. Cal.com booking modal açılmalı
3. Tarih ve saat seçin
4. Form doldurun ve randevuyu onaylayın
5. Google Calendar'ınızı kontrol edin - event eklendi mi?
6. Email geldi mi?

## Cal.com Avantajları

✅ **Tamamen Ücretsiz**
✅ **Otomatik Google Calendar Sync**
✅ **Google Meet Integration**
✅ **Email & SMS Reminders**
✅ **Timezone Detection**
✅ **Custom Branding**
✅ **No Ads**
✅ **Unlimited Event Types**

## Production Deployment

Vercel'e deploy ettiğinizde:
1. Cal.com link'leri otomatik çalışacak
2. Ekstra konfigürasyon gerekmez
3. Environment variable'a gerek yok

## Sorun Giderme

**Modal açılmıyor:**
- Dev server'ı yeniden başlatın
- Browser console'da hata var mı kontrol edin

**Cal.com embed görünmüyor:**
- Cal.com link'i doğru mu?
- Event type public olarak ayarlandı mı?

**Randevu oluşturulamıyor:**
- Google Calendar bağlantısı aktif mi?
- Availability ayarları doğru mu?

## Yardım

- Cal.com Docs: https://cal.com/docs
- Cal.com Community: https://github.com/calcom/cal.com/discussions
