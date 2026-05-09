---
title: JS8Call — FT8 Altyapısı + Klavye Chat ile Hibrit Dijital Mod
description: >-
  JS8Call dijital mod rehberi. FT8 weak-signal altyapısı + Heartbeat + Group +
  Direct messages. Kurulum, frekanslar, gateway / store-and-forward, RX/TX
  cycles.
keywords:
  - JS8Call
  - dijital
  - FT8
  - weak signal
  - chat
  - EmComm
article_section: JS8Call
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: FT8 ile aynı zamanda kullanabilir miyim?
    a: >-
      Ayrı yazılım — JS8Call ve WSJT-X aynı anda çalışmaz (audio kart conflict).
      Birini kapat, birini aç.
  - q: Türkçe karakter destekli mi?
    a: >-
      Evet, UTF-8 — ç, ğ, ı, ö, ş, ü her şey çalışır. Mesaj uzunluğu 3 frame
      için 12 karakter, daha uzunsa multiple frame.
  - q: 'Telsizim CAT control desteklemiyor, çalışır mı?'
    a: >-
      Evet, sadece audio yeterli. Frekansı manuel ayarla, JS8Call CAT'siz audio
      ile decode/encode yapar.
  - q: Lisans gerek mi?
    a: >-
      Evet — B sınıfı (HF kullanım yetkisi). C sınıfı 28 MHz (10m) açık olunca
      JS8 yapabilir ama HF için B önerilir.
  - q: En iyi setup?
    a: >-
      - Icom IC-7300 + Windows + JS8Call → "tıklat çalıştır" tarzı - 5W güç, 40m
      EFHW dipole → 15 dakikada Avrupa kontak ---
---
[FT8 tutorialımız](/tutorials/ft8-dijital-mod) FT8'in 15 saniyelik fixed-format kontağını işliyor. **JS8Call** = FT8 altyapısının üstünde inşa edilmiş **klavye chat** modu. -22 dB SNR'da konuşma, store-and-forward, group calls. Bu rehber JS8Call kurulumu + pratik kullanım + EmComm değeri.

## JS8Call nedir?

Jordan Sherer (KN4CRD) tarafından geliştirilen açık kaynak dijital mod. **Avantaj:** FT8'in zayıf-sinyal performansı (decode -25 dB SNR'a kadar) + esnek text mesajlaşma. **Dezavantaj:** FT8'den yavaş (10s-30s slot vs 15s sabit).

### FT8 vs JS8Call

| Özellik | FT8 | JS8Call |
| --- | --- | --- |
| Mesaj | Sabit format (callsign + grid) | Serbest text |
| Slot süresi | 15s sabit | 10/15/30s seçimli |
| SNR limit | \-25 dB | \-22 dB (biraz az hassas) |
| Kontak süresi | ~75s tipik | Sınırsız (chat) |
| Group / direct | Yok | Var (heartbeat groups) |
| Store & forward | Yok | Var (relay nodes) |

## Hangi durumda JS8Call?

### İdeal kullanım

-   **Acil iletişim** — afet, internet kesintisi → kısa mesajlaşma
-   **DX'te chat** — sadece "5/9 73" yerine gerçek konuşma
-   **Off-grid haberleşme** — solar QRP setupı
-   **Ulaşılamayan bölge** — store-and-forward ile geç teslim

### FT8 daha iyi durumlar

-   DXCC chase — hızlı kontak, çok sayıda
-   Contest — short exchange yeter
-   Casual DX — 75 saniyede tamamlanır

## Kurulum

### 1\. JS8Call indir

[js8call.com](http://js8call.com/) → Win/Mac/Linux ücretsiz.

### 2\. Telsiz bağlantı

-   USB kablo (modern Yaesu/Icom direct USB) veya
-   Ses kart + CAT kablo (eski telsiz)

### 3\. Yapılandırma

-   File → Settings
-   Audio: telsiz USB ses kart seç
-   Radio: telsiz CAT ayarı (Yaesu = 38400 baud, Icom = 9600 vs)
-   General: çağrı işareti + Maidenhead grid (KN41la)

### 4\. Frekanslar

JS8Call USB modunda:

-   **80m**: 3.578 MHz
-   **40m**: 7.078 MHz
-   **30m**: 10.130 MHz
-   **20m**: 14.078 MHz
-   **17m**: 18.104 MHz
-   **15m**: 21.078 MHz
-   **10m**: 28.078 MHz

(FT8 ile aynı bant fakat **+0.06 MHz offset** — JS8 ve FT8 birbirine karışmasın)

### 5\. Speed/cycle seç

-   **Fast (10s)**: en hızlı, kontak için iyi
-   **Normal (15s)**: standart, FT8 ile uyumlu
-   **Slow (30s)**: en hassas, EmComm için
-   **Turbo (6s)**: pile-up için (ama az hassas)

İlk kullanım için **Normal** öner.

## Kullanım — temel

### Pencere yapısı

-   **Band Activity**: aynı frekansta dinlenen tüm sinyaller (FT8 gibi)
-   **RX Frequency**: sen alıyorsun bu sinyali
-   **TX Frequency**: sen TX yapıyorsun
-   **DX Calls**: heard callsign'lar
-   **Heartbeat**: otomatik beacon (her 60s bir ping)

### İlk kontak

1.  Pencerede başka operatör görüyorsun: TA2ABC
2.  **Onun callsign'ına çift tıkla** → DX call seçildi
3.  **Mesaj kutusuna**: `TA2ABC HELLO!` yaz, gönder
4.  30 saniye sonra cevap gelir
5.  Sohbet devam et — gerçek mesajlar

### CQ atma

-   Toolbar: "CQ" buton
-   Mesaj: `CQ KN4CRD` (KN4CRD = grid)
-   Cevap gelince TA2ABC ile dialog kur

## Heartbeat ve Groups

### Heartbeat (kalp atışı)

JS8Call'ın özelliği — **otomatik beacon**:

-   Her 60 saniyede `(YOUR_CALL: HB AUTO RELAY)` mesajı yayar
-   Diğer operatörler senin "online" olduğunu görür
-   Sen yokken bile kontak fırsatı

### Groups

Çoklu operatör mesajı:

-   Group adı: `@TURKEY`, `@EMCOMM`, `@HF`
-   Mesaj: `@TURKEY: Selam herkese, hava nasıl?`
-   O grupta dinleyen herkes mesajı görür

Türkiye'de aktif gruplar:

-   **@TURKEY** — TR ulusal
-   **@TARABYA** — sosyal
-   **@HFEMCOMM** — afet/acil

### Direct messages

Belirli operatöre özel:

-   `TA2ABC: Bekleme yapıyorum, bir saat sonra orada olurum.`
-   TA2ABC dışında okumaz (private değil ama directed)

## Store-and-forward (Relay)

JS8Call'ın **mucize özelliği** — operatör mesajını başka operatöre **bırakabilir**, sonra üçüncü operatör çağırınca teslim edilir.

### Senaryo

-   Sen: TA1ABC, gece 23:00
-   Hedef: K1JT (USA), saat farkı
-   Yol: TA1ABC → DK7ZB (gece 23:00 Almanya'da) → K1JT (gündüz USA)

### Mesaj formatı

-   `K1JT: Selam Joe, JS8Call Türkiye selamı!`
-   DK7ZB'nin JS8Call istasyonu mesajı **store** eder
-   6 saat sonra K1JT online olunca, DK7ZB istasyonu **forward** eder
-   K1JT mesajı alır, "store-and-forward via DK7ZB" gösterir

### Yetki

-   Relay yapmak için onay vermek gerek (settings'de aç)
-   Senin istasyonun başkasının mesajlarını saklayabilir
-   "Asynchronous communication" — radyoya katılmak gerek değil hep

## EmComm uygulaması

Acil iletişim'de JS8Call'ın yıldız parladığı yer:

### Senaryo: deprem sonrası

1.  AFAD net frekans aktif: 14.078 MHz JS8Call (Normal speed)
2.  **@EMCOMM** group'a check-in: `(YOUR_CALL: @EMCOMM CHECK-IN, hayatta, evde, KN41la)`
3.  Hasar bildirimi: `@EMCOMM: Bahçelievler 5 katlı bina çatlamış, AFAD bilgisi giderim, internet yok.`
4.  **Internet yokken** mesaj amatör radyo üzerinden yayılır
5.  Internet'i olan operatör (örn. başka şehir) → mesajı AFAD web'e ileti

### WinLink alternatifi

-   WinLink (radyodan e-mail) gateway'a bağlanmak gerek
-   JS8Call peer-to-peer — gateway şart değil
-   Daha hafif yazılım, daha az bandwidth

## Pratik ipuçları

### TX güç

-   **5-10W yeterli** — JS8 weak-signal, küçük gücü tolere
-   50W üstü gereksiz, finalleri yıpratır

### Bant seçimi

-   **40m gece**, 20m gündüz — propagasyon kuralları
-   Aktif bant Heartbeat ile gör — hangi bantta kim varsa görünür

### Saat sync

WSJT-X gibi JS8Call **doğru saat** ister. NTP sync zorunlu (Windows time, Mac/Linux ntpd).

### Audio level

-   TX: telsiz ALC indikatörü **az** olmalı (0 dB veya altı)
-   RX: WSJT-X "60-80" green range
-   Bilgisayar ses kart Windows mixer'dan ayarla

### Macros

-   Tipik mesajlar için kısayol: F1 = "73 BEST DX", F2 = "QRZ?", vs
-   Settings → Macros'tan ekle

## Frekans nezaketi

JS8Call **dar bant** kullanır (50 Hz'den daha az). Bu yüzden 14.078'de 30+ operatör eşzamanlı çalışabilir — herkes farklı offset (RX freq).

### Pratik

-   Boş offset bul — Band Activity'de çakışmayan yer
-   TX yapacaksan **kendi offset'in seç** (200-2500 Hz arası)
-   Diğer kullanıcılarla **aynı offset paylaşma** — collision

## Sık sorulan sorular

### FT8 ile aynı zamanda kullanabilir miyim?

Ayrı yazılım — JS8Call ve WSJT-X aynı anda çalışmaz (audio kart conflict). Birini kapat, birini aç.

### Türkçe karakter destekli mi?

Evet, UTF-8 — ç, ğ, ı, ö, ş, ü her şey çalışır. Mesaj uzunluğu **3 frame için 12 karakter**, daha uzunsa multiple frame.

### Telsizim CAT control desteklemiyor, çalışır mı?

Evet, sadece audio yeterli. Frekansı manuel ayarla, JS8Call CAT'siz audio ile decode/encode yapar.

### Lisans gerek mi?

Evet — B sınıfı (HF kullanım yetkisi). C sınıfı 28 MHz (10m) açık olunca JS8 yapabilir ama HF için B önerilir.

### En iyi setup?

-   Icom IC-7300 + Windows + JS8Call → "tıklat çalıştır" tarzı
-   5W güç, 40m EFHW dipole → 15 dakikada Avrupa kontak

* * *

## İlgili kaynaklar

-   [FT8 dijital mod](/tutorials/ft8-dijital-mod) — temel FT8
-   [WSPR](/tutorials/wspr-zayif-sinyal-yayini) — beacon mod
-   [WinLink](/tutorials/winlink-email-over-radio) — radyodan email
-   [Afet acil durum haberleşmesi](/tutorials/afet-acil-durum-haberlesmesi)
-   JS8Call indir: [js8call.com](http://js8call.com/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — JS8Call makaleleri
