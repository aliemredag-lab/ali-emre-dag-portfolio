# Site Test Checklist - Ali Emre Dağ Portfolio

## 🏠 Ana Sayfa (http://localhost:3000)

### Navigation Links (Scroll Links)
- [ ] **Home** (#hero) - Hero bölümüne scroll
- [ ] **About** (#about) - About bölümüne scroll
- [ ] **Experience** (#experience) - Experience bölümüne scroll
- [ ] **Skills** (#skills) - Skills bölümüne scroll
- [ ] **Projects** (#projects) - Projects bölümüne scroll (Members-only)
- [ ] **Register** (#register) - Register bölümüne scroll
- [ ] **Contact** (#contact) - Contact formuna scroll

### Navigation Links (Page Links)
- [ ] **Articles** (/posts) - LinkedIn posts sayfası

### Sections (Public - Herkes Görebilir)
- [ ] **Hero Section** - İsim, title, CTA butonları
- [ ] **Testimonials** - Client testimonials
- [ ] **About** - Bio ve summary
- [ ] **Experience** - İş geçmişi timeline
- [ ] **Skills** - Yetenekler ve tools
- [ ] **Education** - Eğitim bilgileri
- [ ] **Register Section** - Üyelik formu
- [ ] **Contact Section** - İletişim formu
- [ ] **Footer** - Social links ve copyright

### Sections (Members-Only - Giriş Gerekli)
- [ ] **Membership Gate** - Preview modunda 6 feature gösterir
- [ ] **Expertise Banner** - Premium expertise showcase
- [ ] **Stats Section** - KPI metrikleri
- [ ] **Case Studies** - Renault, Bosch, Siemens projeleri
- [ ] **Projects** - Portfolio projeleri
- [ ] **Insights Blog** - LinkedIn makaleleri
- [ ] **Calendar Booking** - Cal.com randevu sistemi

---

## 🔐 Authentication System

### Member Registration
- [ ] Register formunda email, şifre, name, surname alanları
- [ ] Email validation çalışıyor mu
- [ ] Şifre minimum 6 karakter kontrolü
- [ ] Başarılı kayıt sonrası otomatik login
- [ ] `/api/auth/register` endpoint çalışıyor

### Member Login
- [ ] Login formu açılıyor
- [ ] Email/password ile giriş yapılıyor
- [ ] Hatalı bilgilerle hata mesajı gösteriliyor
- [ ] Başarılı giriş sonrası premium content açılıyor
- [ ] `/api/auth/login` endpoint çalışıyor

### Logout
- [ ] Logout butonu çalışıyor
- [ ] Çıkış yapınca premium content kapanıyor
- [ ] `/api/auth/logout` endpoint çalışıyor

### Admin Preview Mode
- [ ] Admin panelinden "Preview Site as Guest" butonu
- [ ] Butona tıklayınca localStorage'a flag ekleniyor
- [ ] Yeni sekmede açılan sayfada tüm content görünüyor
- [ ] localStorage.removeItem ile devre dışı bırakılabiliyor

---

## 👤 Admin Panel (/admin)

### Admin Login
- [ ] `/admin` URL'i çalışıyor
- [ ] Şifre: `Admin5168` ile giriş yapılıyor
- [ ] Hatalı şifrede hata mesajı
- [ ] Başarılı girişte dashboard açılıyor

### Dashboard Tab
- [ ] 4 stat card görünüyor (Posts, Projects, Experience, Countries)
- [ ] Recent Activity listesi görünüyor
- [ ] Quick Actions butonları çalışıyor:
  - [ ] **Preview Site as Guest** - Ana sayfayı unlock ediyor
  - [ ] **Edit Profile Information** - `/admin/edit` sayfası
  - [ ] **Manage Content** - Content tab'ına geçiş
  - [ ] **Upload Photo** - `/admin/media` sayfası
  - [ ] **Manage Projects** - `/admin/projects` sayfası
  - [ ] **LinkedIn Articles** - `/admin/posts` sayfası
  - [ ] **Manage Users** - `/admin/users` sayfası
  - [ ] **View Analytics** - Analytics tab'ına geçiş
  - [ ] **Site Settings** - Settings tab'ına geçiş

### Content Tab
- [ ] 8 content card görünüyor
- [ ] Her card'da Edit butonu çalışıyor
- [ ] Recent Changes listesi görünüyor

### Analytics Tab
- [ ] Traffic Sources gösteriliyor
- [ ] Page Views gösteriliyor
- [ ] Visitor Locations gösteriliyor

### Settings Tab
- [ ] Site Configuration toggleları var
- [ ] **Change Admin Password** butonu
  - [ ] Modal açılıyor
  - [ ] Current password, new password, confirm password alanları
  - [ ] Validation çalışıyor
  - [ ] Şifre değişikliği başarılı
  - [ ] `/api/admin/auth` change-password endpoint çalışıyor
- [ ] Theme cards gösteriliyor

### Admin Logout
- [ ] Logout butonu çalışıyor
- [ ] `/admin/login` sayfasına yönlendiriyor
- [ ] Session temizleniyor

---

## 📅 Cal.com Booking System

### Calendar Section
- [ ] 3 meeting type card görünüyor:
  - [ ] 15 min - Quick Introduction
  - [ ] 30 min - Supply Chain Consultation
  - [ ] 60 min - Strategy Workshop
- [ ] Her card'da doğru icon, duration, features var

### Booking Modal
- [ ] "Book Now" butonuna tıklayınca modal açılıyor
- [ ] Cal.com embed görünüyor
- [ ] Cal.com link'leri doğru:
  - [ ] `ali-emre-dag-8mspaz/15min`
  - [ ] `ali-emre-dag-8mspaz/30min`
  - [ ] `ali-emre-dag-8mspaz/60min`
- [ ] Tarih seçilebiliyor
- [ ] Saat seçilebiliyor
- [ ] Form doldurulabiliyor
- [ ] Randevu oluşturuluyor
- [ ] Google Calendar'a ekleniyor
- [ ] Email bildirimi gidiyor
- [ ] Close butonu çalışıyor

---

## 📧 Contact Form

### Form Fields
- [ ] Name alanı var
- [ ] Email alanı var
- [ ] Subject alanı var
- [ ] Message textarea var
- [ ] Phone (opsiyonel) alanı var

### Form Submission
- [ ] Validation çalışıyor
- [ ] Boş alan uyarısı veriyor
- [ ] Email format kontrolü yapılıyor
- [ ] Submit butonu çalışıyor
- [ ] Başarı mesajı gösteriliyor
- [ ] `/api/contact` endpoint çalışıyor

---

## 🌐 External Links

### Social Media Links (Footer)
- [ ] **LinkedIn** - https://linkedin.com/in/ali-emre-dag
- [ ] **GitHub** - Var mı?
- [ ] **Twitter** - Var mı?
- [ ] **Email** - aliemredag@gmail.com

### LinkedIn Posts (/posts)
- [ ] Sayfa açılıyor
- [ ] Post'lar listeleniyor
- [ ] Her post'ta title, date, likes, comments var
- [ ] Post'lara tıklayınca detay açılıyor

---

## 🎨 UI/UX Features

### Theme Toggle
- [ ] Light/Dark mode toggle butonu
- [ ] Tema değişimi çalışıyor
- [ ] Tercih localStorage'da saklanıyor

### Language Toggle
- [ ] TR/EN language toggle butonu
- [ ] Dil değişimi tüm metinleri güncelliyor
- [ ] Tercih localStorage'da saklanıyor

### Cursor Effect
- [ ] Custom cursor efekti aktif
- [ ] Mouse hareketlerini takip ediyor
- [ ] Hover efektleri çalışıyor

### Animations
- [ ] Framer Motion animasyonları çalışıyor
- [ ] Scroll reveal animasyonları aktif
- [ ] Hover efektleri smooth

### Responsive Design
- [ ] **Mobile** (< 768px)
  - [ ] Hamburger menu çalışıyor
  - [ ] Mobile navigation açılıyor/kapanıyor
  - [ ] Cards tek sütun halinde
  - [ ] Text responsive
- [ ] **Tablet** (768px - 1024px)
  - [ ] Layout 2 sütun
  - [ ] Navigation collapse ediyor
- [ ] **Desktop** (> 1024px)
  - [ ] Full navigation görünüyor
  - [ ] 3 sütun grid
  - [ ] Tüm features görünüyor

---

## 🐛 Error Handling

### 404 Page
- [ ] Olmayan URL'de 404 sayfası
- [ ] Ana sayfaya dönüş linki

### API Errors
- [ ] Network hataları handle ediliyor
- [ ] User-friendly error mesajları
- [ ] Console'da anlamlı log'lar

### Form Validation
- [ ] Required field uyarıları
- [ ] Email format kontrolü
- [ ] Password strength kontrolü
- [ ] Helpful error messages

---

## ⚡ Performance

### Load Time
- [ ] İlk yükleme < 3 saniye
- [ ] Navigation hızlı
- [ ] Image'ler optimize

### Build
- [ ] `npm run build` hatasız çalışıyor
- [ ] Production build oluşuyor
- [ ] No TypeScript errors
- [ ] No ESLint errors

---

## 🚀 Deployment Checklist

### Environment Variables
- [ ] `.env.local` dosyası gitignore'da
- [ ] Production'da environment variables set edilecek:
  - [ ] `JWT_SECRET`
  - [ ] `GOOGLE_CALENDAR_ID` (opsiyonel)
  - [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL` (opsiyonel)
  - [ ] `GOOGLE_PRIVATE_KEY` (opsiyonel)

### Vercel Deployment
- [ ] GitHub repository bağlı
- [ ] Vercel project oluşturuldu
- [ ] Environment variables eklendi
- [ ] Production URL çalışıyor
- [ ] Admin panel production'da erişilebilir
- [ ] Cal.com links production'da çalışıyor

---

## ✅ Test Sonuçları

**Test Tarihi**: _________
**Test Eden**: _________
**Dev Server**: http://localhost:3000

### Kritik Sorunlar
- [ ] Yok

### Minor Sorunlar
- [ ] Yok

### Notlar
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
