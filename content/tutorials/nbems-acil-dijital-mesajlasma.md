---
title: NBEMS — Dar Bant Acil Dijital Mesajlaşma (fldigi Tabanlı)
description: >-
  NBEMS (Narrow Band Emergency Messaging Software) rehberi. fldigi + flmsg +
  flamp ile WinLink alternatifi, ICS-213 form gönderme, peer-to-peer veri
  iletimi, gateway gereksiz.
keywords:
  - NBEMS
  - fldigi
  - EmComm
  - acil iletişim
  - dijital
  - mesajlaşma
article_section: NBEMS
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Lisans gerek mi?
    a: Evet — HF'te TX için B sınıfı. VHF'te C sınıfı yeter.
  - q: fldigi ücretsiz mi?
    a: 'Evet — açık kaynak, Win/Mac/Linux.'
  - q: WinLink varsa NBEMS'e gerek var mı?
    a: >-
      WinLink gateway'i çökmüşse veya erişilemiyorsa NBEMS tek seçenek. İkisini
      de kur, ikisini de pratik et.
  - q: En kolay mod hangisi?
    a: 'Olivia 8/500 — fldigi''de preset olarak gelir, hassas + güvenilir.'
  - q: Telsiz hangisi?
    a: >-
      SSB yapabilen herhangi bir telsiz — IC-7300, FT-991A, Xiegu G90. USB cable
      ile bilgisayara bağla. ---
---
[WinLink tutorialımız](/tutorials/winlink-email-over-radio) radyodan e-posta anlatıyor. Ama WinLink gateway istasyonuna bağlanmak gerekiyor — gateway çökmüşse? **NBEMS** = gateway gereksiz, peer-to-peer, dar bantla resmi form gönderme. Afet haberleşmesinin **veri odaklı** yüzü.

## Neden "veri odaklı" afet haberleşmesi?

Sesli haberleşme **hızlı** — ama:

-   Koordinat okumak hata riski (bir rakam yanlış = yanlış bölge)
-   Liste aktarmak (kayıp kişi, malzeme) sesle zor
-   Resmi form (ICS-213) doldurup sesle okumak **çok yavaş**

Çözüm: metin + form + dosya → dijital paket → radyo. NBEMS bunu gateway olmadan yapar.

## NBEMS nedir?

**Narrow Band Emergency Messaging Software** — 3 yazılımdan oluşan ücretsiz takım:

### 1\. fldigi (çekirdek motor)

-   Dijital mod encode/decode — BPSK, MFSK, Olivia, MT63 vs.
-   SSB telsiz + bilgisayar ses kart ile çalışır
-   Tüm NBEMS operasyonunun temeli
-   [fldigi →](http://www.w1hkj.com/Fldigi.html)

### 2\. flmsg (form editörü)

-   ICS-213 (General Message)
-   ICS-205 (Radio Communications Plan)
-   ICS-206 (Medical Plan)
-   HICS (Hospital) formları
-   **AFAD/Kızılay uyumlu** form şablonları
-   Form doldur → fldigi üzerinden gönder

### 3\. flamp (dosya transfer)

-   Metin dosyası, küçük resim, CSV
-   Hata düzeltmeli (ARQ) transfer
-   Büyük dosya **parçalara** böler, alıcı birleştirir

## WinLink vs NBEMS

|  | WinLink | NBEMS |
| --- | --- | --- |
| **Gateway gerek** | Evet (RMS istasyonu) | **Hayır** (peer-to-peer) |
| **İnternet bağlantı** | Gateway tarafında evet | Hiç gerek yok |
| **E-mail formatı** | Evet (SMTP/POP3) | Hayır (form + dosya) |
| **Güç gereksinimi** | Orta (VARA modem yüksek SNR ister) | Düşük (Olivia/MT63 çok hassas) |
| **Kullanım kolaylığı** | Orta (VARA lisans, kurulum) | Kolay (fldigi ücretsiz, basit) |
| **Form desteği** | ICS-213 dahili | ICS-213 + ICS-205 + HICS + özel |
| **Dosya gönderme** | Ek (attachment) | flamp ile parçalı |

**Pratik:** İkisini birden kur. WinLink çalışıyorsa onu kullan (e-mail avantajı). Gateway yoksa NBEMS'e geç.

## Kurulum (15 dakika)

### 1\. fldigi indir + kur

-   [w1hkj.com](http://www.w1hkj.com/) → Win/Mac/Linux ücretsiz
-   Çağrı işareti + grid gir
-   Telsiz ses kart bağlantısı (USB veya audio cable)

### 2\. flmsg indir + kur

-   Aynı siteden
-   fldigi ile otomatik entegre

### 3\. flamp indir + kur (opsiyonel)

-   Dosya transfer gerekiyorsa

### 4\. Frekans ayarı

HF bantlarda popüler NBEMS frekansları:

-   **80m:** 3.583 MHz USB (Olivia 8/500)
-   **40m:** 7.072 MHz USB (BPSK/Olivia)
-   **20m:** 14.073 MHz USB (çeşitli)

VHF'te:

-   **2m:** 145.070 MHz USB (Olivia)

## Pratik operasyon

### Form gönderme (ICS-213)

1.  **flmsg** aç → "ICS-213" seç
2.  Form doldur:
    -   Gönderen: TB3KKD
    -   Alıcı: AFAD İzmir
    -   Konu: "Kadıköy hasarlı bina raporu"
    -   Mesaj: koordinat, hasar detayı, kişi sayısı
3.  "AutoSend" tıkla → fldigi otomatik devralır
4.  fldigi SSB USB modunda **TX** → form dijital paket olarak havaya
5.  Karşı taraf fldigi + flmsg açık → form otomatik decode, ekranda görünür

### Dosya gönderme (flamp)

1.  **flamp** aç → dosya seç (CSV, TXT, küçük JPG)
2.  Dosyayı **parçalara böl** (her parça 1-2 KB)
3.  fldigi üzerinden her parça sırayla TX
4.  Alıcı parçaları toplar → dosya birleşir
5.  Eksik parça varsa → tekrar iste (ARQ)

## Mod seçimi (fldigi)

fldigi birçok dijital mod destekler — NBEMS için en uygunlar:

### Olivia 8/500 (önerilen)

-   500 Hz bantgenişliği, 8 ton
-   **Çok hassas** — düşük SNR'da bile decode
-   Hız: ~22 WPM (yavaş ama güvenilir)
-   EmComm standart modu

### MT63 (hızlı)

-   1000 Hz bant, yüksek hız
-   Propagasyon iyiyken tercih
-   Hız: ~100 WPM

### MFSK-32 (orta)

-   500 Hz, 32 ton
-   Olivia'dan hızlı, MT63'ten hassas
-   Fotoğraf gönderme desteği (MFSK Pic)

### PSK31 (klasik)

-   31 Hz bantgenişliği, çok dar
-   Gerçek zamanlı chat
-   Hız: ~50 WPM

## EmComm senaryosu

### Deprem sonrası — internet yok, GSM yok

**Saat 14:00** — deprem

-   AFAD net frekansı: 7.072 MHz USB

**Saat 15:00** — operatör TB3KKD sahada

1.  Laptop + Xiegu G90 + EFHW anten → solar panel
2.  fldigi açık, 7.072 MHz, Olivia 8/500 mod
3.  Net Control: "TB3KKD, hasar raporu gönder"

**Saat 15:05** — flmsg ile ICS-213 doldur:

```
TO: AFAD İzmir Koordinasyon
FROM: TB3KKD, Kadıköy Saha
SUBJECT: Hasar raporu Blok-3
BODY: Koordinat 40.9876°N, 29.0234°E
5 katlı bina kısmi çökme, 12 kişi enkaz altı tahmini
Yol erişim VAR, ambulans geçişi UYGUN
Acil ihtiyaç: kurtarma ekibi + sağlık
```

**Saat 15:06** — AutoSend → form havaya **Saat 15:07** — Net Control decode etti, AFAD'a iletti

Sesle bu form'u okumak 3-5 dakika sürer + hata riski. NBEMS ile **60 saniyede**, hatasız, kaydı dijital.

## Offline çalışma

NBEMS'in en büyük avantajı: **hiçbir internet bağlantısı gerekmiyor**.

-   fldigi bilgisayarda çalışır (offline)
-   Telsiz RF ile gönderir
-   Karşı taraf telsiz RF ile alır
-   Gateway yok, sunucu yok, internet yok

Solar panel + QRP telsiz + laptop = **sınırsız süre** dijital mesajlaşma.

## NBEMS vs JS8Call

|  | NBEMS | JS8Call |
| --- | --- | --- |
| Form desteği | Evet (ICS-213 vs) | Hayır |
| Dosya transfer | Evet (flamp) | Hayır |
| Store & forward | Hayır | Evet |
| Chat | PSK31 ile | Evet (ana özellik) |
| Hassasiyet | Olivia çok hassas | \-22 dB SNR |

**Pratik:** Form + dosya gerekiyorsa NBEMS. Chat + store-forward gerekiyorsa [JS8Call](/tutorials/js8call-radyo-chat-modu). İkisi birlikte kullanılabilir.

## Sık sorulan sorular

### Lisans gerek mi?

Evet — HF'te TX için B sınıfı. VHF'te C sınıfı yeter.

### fldigi ücretsiz mi?

Evet — açık kaynak, Win/Mac/Linux.

### WinLink varsa NBEMS'e gerek var mı?

WinLink gateway'i çökmüşse veya erişilemiyorsa NBEMS tek seçenek. **İkisini de kur, ikisini de pratik et.**

### En kolay mod hangisi?

Olivia 8/500 — fldigi'de preset olarak gelir, hassas + güvenilir.

### Telsiz hangisi?

SSB yapabilen herhangi bir telsiz — IC-7300, FT-991A, Xiegu G90. USB cable ile bilgisayara bağla.

* * *

## İlgili kaynaklar

-   [Afet acil durum haberleşmesi](/tutorials/afet-acil-durum-haberlesmesi)
-   [WinLink radyodan email](/tutorials/winlink-email-over-radio)
-   [JS8Call radyo chat](/tutorials/js8call-radyo-chat-modu)
-   [NVIS haberleşmesi](/tutorials/nvis-haberlesmesi)
-   [ARES/RACES EmComm](/tutorials/ares-races-emcomm-organizasyon)
-   fldigi: [w1hkj.com](http://www.w1hkj.com/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — NBEMS makaleleri
