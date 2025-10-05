# 🔍 SEO Optimization Guide

Bu proje Google ve diğer arama motorları için optimize edilmiştir.

## ✅ Eklenen SEO Özellikleri

### 1. **Dinamik Sitemap.xml**
- Otomatik olarak tüm sayfaları listeliyor
- LinkedIn postları dinamik olarak ekleniyor
- Projeler sitemap'e dahil
- Erişim: `https://aliemredag.com/sitemap.xml`

### 2. **Robots.txt**
- Arama motorlarına hangi sayfaların taranacağını söylüyor
- Admin ve API sayfaları gizli
- Erişim: `https://aliemredag.com/robots.txt`

### 3. **Enhanced Metadata**
```typescript
- Title: "Ali Emre Dağ - International Supply Chain Leader"
- Description: Detaylı ve anahtar kelime zengin
- Keywords: 15+ anahtar kelime
- Open Graph: Facebook/LinkedIn paylaşımları için
- Twitter Cards: Twitter paylaşımları için
```

### 4. **JSON-LD Schema Markup**
Google'ın sizi daha iyi anlaması için:
- Person schema
- Eğitim bilgileri (alumniOf)
- Beceriler (knowsAbout)
- Sertifikalar (hasCredential)
- Şirket bilgisi (worksFor)

## 🚀 Yapılması Gerekenler

### Domain URL'sini Güncelleyin
Aşağıdaki dosyalarda `https://aliemredag.com` kendi domain'iniz ile değiştirin:

1. **`app/sitemap.ts`** - Line 5
2. **`app/robots.ts`** - Line 4
3. **`app/layout.tsx`** - Line 28, 48

### Google Search Console Kurulumu

1. [Google Search Console](https://search.google.com/search-console)'a gidin
2. Domain'inizi ekleyin
3. Verification code'u alın
4. `app/layout.tsx` dosyasında Line 91'deki kodu güncelleyin:
   ```typescript
   verification: {
     google: 'your-verification-code-here',
   },
   ```

### Google Analytics (Opsiyonel)

`app/layout.tsx` içine Google Analytics eklemek için:

```typescript
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## 📊 SEO Kontrol Listesi

### Deployment Sonrası:
- [ ] Google Search Console'da domain doğrulama
- [ ] Sitemap'i Google'a gönder: `https://yourdomain.com/sitemap.xml`
- [ ] Robots.txt'i kontrol et: `https://yourdomain.com/robots.txt`
- [ ] LinkedIn'de paylaş ve Open Graph önizlemesini kontrol et
- [ ] Twitter'da paylaş ve Twitter Card önizlemesini kontrol et
- [ ] Mobile uyumluluğu test et: [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [ ] PageSpeed Insights: [Test et](https://pagespeed.web.dev/)

### SEO Araçları:
- **Schema Validator**: https://validator.schema.org/
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Open Graph Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator

## 🎯 Anahtar Kelimeler

Şu an optimize edilen anahtar kelimeler:
- supply chain management
- global operations
- logistics
- inventory management
- procurement
- production planning
- Lean Six Sigma
- SAP ERP
- Power BI
- operations management
- project management
- Renault
- Bosch
- international business
- supply chain optimization

## 📈 Beklenen Sonuçlar

Bu optimizasyonlar ile:
- ✅ Google'da "Ali Emre Dağ" aramasında üst sıralarda
- ✅ "supply chain manager Turkey" gibi aramalarda görünürlük
- ✅ LinkedIn/Twitter paylaşımlarında zengin önizlemeler
- ✅ Google Knowledge Graph'da profil bilgileri
- ✅ Mobil aramada optimize görünüm

## 🔄 Düzenli Güncellemeler

SEO'yu canlı tutmak için:
1. **Her ay**: Yeni blog post ekleyin (admin panelden)
2. **Her 3 ay**: Metadata'yı güncelleyin
3. **Her 6 ay**: Keywords'leri gözden geçirin
4. **Sürekli**: Google Search Console'u kontrol edin

## 📞 Yardım

Sorularınız için:
- Proje README'sini okuyun
- GitHub Issues açın
- SEO uzmanına danışın

---

**Not**: SEO sonuçları 2-3 ay içinde görünmeye başlar. Sabırlı olun ve düzenli içerik ekleyin! 🚀
