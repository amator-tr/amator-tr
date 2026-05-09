---
title: 'Log Tutma, QSL Kartları ve LotW — Kontaklarını Doğrula ve Sakla'
description: >-
  Amatör telsiz kontak kayıtları, QSL kartları (kağıt + eQSL + LotW), DXCC
  awards, ARRL Logbook of the World kayıt + kullanım, logging yazılımı
  önerileri.
keywords:
  - log
  - QSL
  - LotW
  - eQSL
  - DXCC
  - awards
article_section: log
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: 'LotW''a gönderdim, neden matching yok?'
    a: >-
      Karşı taraf da kendi log'unu LotW'a göndermiş olmalı. Tek tarafsa matching
      olmaz.
  - q: eQSL "Authenticity Guaranteed" nedir?
    a: >-
      Lisans onayı yapılmış kullanıcılar — onların kontak doğrulaması daha
      güvenilir, eAward için kabul.
  - q: Paper QSL'in geleceği var mı?
    a: >-
      Azalıyor ama ölmedi. Estetik + nostalji için ayakta. Çok sayıda DX
      operatörü hâlâ paper kart yolluyor.
  - q: Logging yazılımını nasıl seçerim?
    a: >-
      - Sadece QSO log: Logger32, MacLoggerDX - Contest: N1MM Logger+ -
      POTA/SOTA: HamRS - Mobile: LogFox iOS
  - q: 'LotW kayıt zaman aldı, hızlandırma var mı?'
    a: 'Hayır, ARRL postayla doğrulamayı yapıyor. 4-8 hafta normal. ---'
---
Yapılan bir QSO biraz havada kalır — sadece tarih, frekans, çağrı işaretiyle. Onu **kayıt altına almak** + **karşı tarafla doğrulamak** = klasik amatör telsiz kültürünün bir parçası. Bu yazı log tutma yöntemleri + üç QSL sistemi (paper, eQSL, LotW) + DXCC award süreci.

## Neden log tutarsın?

### Yasal

-   Türkiye yönetmeliği logbook tutma zorunluluğu **kaldırıldı** (2010+) ama denetim halinde son 1-2 yıllık kontak istenebilir
-   Yine de iyi pratik — sınır durumunda kanıt

### Award programları

-   **DXCC** (100+ DXCC entity) — QSL kart kanıtı zorunlu
-   **WAS** (Worked All States) — 50 ABD eyalet
-   **WAC** (Worked All Continents) — 6 kıta
-   **POTA / SOTA** — aktivasyon onayı
-   **5BDXCC** (5-band DXCC), 100m DXCC vs özel

### Topluluk + nostaljik

-   10 yıl sonra eski log'a bakmak — "2020'de Solomon Adaları'yla 5W ile kontak yapmıştım" anısı
-   Kontak istatistiği — gece/gündüz dağılım, en uzak DX, en aktif bant

## 3 logging seçeneği

### 1\. Kağıt log (eski okul)

-   Defter — tarih, çağrı, frekans, mod, RST, kontak adı, konum
-   Eski mors operatörlerinin standartı
-   Avantaj: elektrik kesik / contest backup için
-   Dezavantaj: ararken acı, eQSL/LotW upload zor

### 2\. Spreadsheet (Excel/Sheets)

-   Basit ama iş görür
-   Filtreleme, arama kolay
-   LotW upload için ADIF export gerek (manuel zor)

### 3\. Logging yazılımı (önerilen)

| Yazılım | Platform | Fiyat | Özellikler |
| --- | --- | --- | --- |
| **Logger32** | Win | Ücretsiz | DX cluster, propagasyon, LotW |
| **Ham Radio Deluxe** | Win | $100 | Ticari, kapsamlı |
| **N1MM Logger+** | Win | Ücretsiz | Contest odaklı |
| **MacLoggerDX** | Mac | $80 | Native macOS |
| **CQRLog** | Linux | Ücretsiz | Açık kaynak |
| **LogFox** | iOS | Ücretsiz | Mobile, bulutla sync |
| **HamRS** | iOS/Android | Ücretsiz | POTA/SOTA odaklı |
| **HRDLog (web)** | Tarayıcı | Ücretsiz | Online, paylaşılabilir |

**Öneri başlangıç için**: Logger32 (Windows) veya CQRLog (Linux) → ücretsiz + kapsamlı. iPhone'da: HamRS.

## Log alanları (minimum)

Her QSO için:

1.  **Tarih + saat** (UTC, lokal değil!)
2.  **Çağrı işareti** (karşı taraf)
3.  **Frekans**
4.  **Mod** (SSB, FM, CW, FT8, vs)
5.  **RST** (gönderdiğin + aldığın)
6.  **Kişinin adı**
7.  **QTH** (konum, şehir veya Maidenhead grid)
8.  **Notlar** (varsa)

Genişletilmiş: 9. **Anten** kullandığın 10. **Güç** (W) 11. **Hava durumu** (HF propagasyon notu için) 12. **DXCC entity, CQ Zone** (otomatik hesaplanır)

## QSL sistemleri

3 ana yöntem — her biri farklı dünyaya ait:

### 1\. Paper QSL (klasik posta kart)

Yıllar boyu standart yol — fiziksel kart posta ile gönder, ev arkadaşı stickerlerini kaplı duvar.

#### Direkt

-   Karşı tarafa direk posta ile kart gönder
-   Self-addressed envelope + IRC (International Reply Coupon) veya $1-2
-   DX kartı için 2-3 hafta beklemek normal

#### Bureau (büro)

-   Türkiye'de **TRAC QSL Bürosu** — TRAC üyelerine
-   Avrupa kart bürosu sistemi — yıllık 1-2 sevkiyat
-   Yavaş (6-24 ay) ama ucuz

#### eQSL

-   Teknik olarak paper değil, **dijital "kart" görüntüsü**
-   eqsl.cc'ye QSO yükle, karşı taraf onaylar (varsa hesabı)
-   Anlık doğrulama
-   DXCC awards için **kabul edilmez** (sadece LotW veya paper)

### 2\. eQSL (eqsl.cc)

-   Online platform, 2 milyon+ üye
-   AG (Authenticity Guaranteed) tier — extra doğrulama
-   Award programları (eAward) eqsl.cc içinde
-   ARRL DXCC için kabul edilmez

### 3\. LotW (Logbook of the World) — gold standard

-   ARRL tarafından, dijital imzalı QSO matching
-   DXCC, WAS, WAC için **resmi kabul edilen** doğrulama
-   Anlık matching, ücretsiz

#### LotW kayıt süreci

1.  ARRL hesabı aç (ücretsiz)
2.  **TQSL yazılımı** (Win/Mac/Linux ücretsiz)
3.  Çağrı işareti **doğrulama** zorunlu:
    -   **ABD operatörü:** lisans elektronik onay
    -   **Non-US:** lisans fotokopisi + kimlik fotokopisi → ARRL'ye **postayla** gönder
4.  ARRL bekleme süresi: 2-6 hafta
5.  Doğrulama sonrası dijital sertifika al
6.  TQSL ile hesap setup

#### Kriptografik güvenlik (PKI)

LotW sıradan bir web sitesi değil — arkasında **PKI (Public Key Infrastructure)** var. TQSL yazılımı bilgisayarına özel bir **dijital sertifika** yükler. Her QSO kaydı bu sertifikayla **dijital olarak imzalanır** — sahtecilik teknik olarak imkansız hale gelir. 1920'lerin posta kartlarından **kriptografik dijital mühüre** evrilen bir sistem.

#### LotW upload akışı

1.  Logging yazılımından QSO'ları **ADIF export**
2.  TQSL ile dosyayı **dijital imzala** (senin özel sertifikanla)
3.  lotw.arrl.org'a upload
4.  Karşı tarafın LotW'inde QSO matching (tarih + saat + mod + bant **birebir** tutmalı)
5.  **Confirmed** statüsü — DXCC için kullanılabilir

#### Türkiye için LotW

-   Lisans ARRL tarafından doğrulanır → 4-8 hafta süreç
-   Türk operatörlerin %30'u LotW kullanıyor
-   DX hunting yapıyorsan **zorunlu**

### Karşılaştırma tablosu

| Özellik | Paper | eQSL | LotW |
| --- | --- | --- | --- |
| Hız | Haftalar/aylar | Anlık | Saniyeler |
| Maliyet | Posta + kart | Ücretsiz | Ücretsiz |
| DXCC kabul | ✓ | ✗ | ✓ |
| Estetik | Var | Görüntü | Yok |
| Doğrulama gücü | Orta | Düşük | Yüksek |
| Setup | Kolay | 5 dakika | 4-8 hafta |

## QSL kart tasarımı (paper)

Eğer paper QSL göndermeyi seviyorsan kendi kartını yapmak gelenek:

### Standart 14×9 cm (postcard)

-   Ön yüz: çağrı işareti büyük + lokasyon + tasarım (anten foto, manzara)
-   Arka yüz: QSO bilgileri (TO, freq, mode, RST, date, time, signature)

### Online basım servisleri

-   LZ3HI (Bulgar) — ucuz, hızlı, amatör operatörlere özel
-   KB3IFH (US) — premium kalite
-   TR Mat Kart sağlayıcıları (Hediyelik)

500 adet ~3000 TL.

## DXCC award süreci

100+ DXCC entity'den onaylı QSO topla, ARRL DXCC plaketi al.

### Adımlar

1.  LotW veya paper QSL ile 100+ entity onaylı QSO yap
2.  ARRL DXCC application formu (ücretli, ~$60 ilk başvuru)
3.  Card checker (hakem) onayı (paper kartlar için)
4.  ARRL onaylar, plaket gönderir

### Endorsement

DXCC'i aldıktan sonra ek "endorsement" — 5-Band DXCC, Phone DXCC (sadece SSB), CW DXCC, vs.

## Log dosya formatları

### ADIF (Amateur Data Interchange Format)

-   Tüm logging yazılımlarının paylaştığı standart
-   Düz text, key-value pairs
-   Her satır 1 QSO

```
<CALL:5>TA2ABC <QSO_DATE:8>20260420 <TIME_ON:4>1430 <BAND:3>20m <MODE:3>SSB <RST_SENT:2>59 <RST_RCVD:2>59 <EOR>
```

### Cabrillo (contest)

-   Yarışma submission formatı
-   Daha az alan, contest-specific

## Sık sorulan sorular

### LotW'a gönderdim, neden matching yok?

Karşı taraf da kendi log'unu LotW'a göndermiş olmalı. Tek tarafsa matching olmaz.

### eQSL "Authenticity Guaranteed" nedir?

Lisans onayı yapılmış kullanıcılar — onların kontak doğrulaması daha güvenilir, eAward için kabul.

### Paper QSL'in geleceği var mı?

Azalıyor ama ölmedi. Estetik + nostalji için ayakta. Çok sayıda DX operatörü hâlâ paper kart yolluyor.

### Logging yazılımını nasıl seçerim?

-   **Sadece QSO log:** Logger32, MacLoggerDX
-   **Contest:** N1MM Logger+
-   **POTA/SOTA:** HamRS
-   **Mobile:** LogFox iOS

### LotW kayıt zaman aldı, hızlandırma var mı?

Hayır, ARRL postayla doğrulamayı yapıyor. 4-8 hafta normal.

* * *

## İlgili kaynaklar

-   [DXCC ve DX hunting](/tutorials/dxcc-dx-hunting) — award programı
-   [Contesting](/tutorials/contesting-yarisma-rehberi) — Cabrillo log
-   [POTA/SOTA](/tutorials/pota-sota-aktivasyon-rehberi) — aktivasyon log
-   [Q kodları + işletme adabı](/tutorials/q-kodlari-isletme-adabi)
-   LotW: [lotw.arrl.org](https://lotw.arrl.org/)
-   eQSL: [eqsl.cc](https://www.eqsl.cc/)
-   TRAC QSL Bürosu: [trac.org.tr](https://www.trac.org.tr/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — log + QSL makaleleri
