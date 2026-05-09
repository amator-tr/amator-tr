---
title: RF Topraklama ve Yıldırımdan Koruma — İstasyonunuzu Savunun
description: >-
  Amatör radyo istasyonu topraklama sistemi — RF ground vs electrical safety
  ground, lightning arrestor (Polyphaser), toprak çubuğu, ground loop önleme,
  yıldırım sigortası.
keywords:
  - topraklama
  - ground
  - yıldırım
  - lightning
  - koruma
  - güvenlik
article_section: topraklama
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Apartmanda lightning protection mümkün mü?
    a: >-
      Sınırlı. Bina ortak topraklaması var — kendi anteni o sisteme dahil et.
      Lightning arrestor kullanmaya devam, fırtınada koaks sök.
  - q: Toprak çubuğunu kendim çakabilir miyim?
    a: >-
      Evet, kalın çekiç ile galvanize çubuğu nemli toprağa kolay çakılır.
      Kayalık zeminde elektrikli kazma şart.
  - q: Multipoint ground kötü mü?
    a: >-
      Multipoint ground = ground loop riski. Single point ground her zaman
      tercih.
  - q: Ne kadar sık test etmeliyim?
    a: >-
      - Yıllık 1× kez bara ↔ çubuk continuity - Sonbahar başında (fırtına sezon
      öncesi) - Lightning arrestor cihazına bakım gerek mi diye bak (her 5 yılda
      bir değiştir)
  - q: Topraklama yıldırımı çeker mi?
    a: >-
      Hayır — toprak çubuğu pasif, vurmuş yıldırımı dışarı yönlendirir. Vurmamış
      yıldırımı çekmez. Aksini iddia eden bilim dışı. ---
---
Anten = mükemmel yıldırım çekici. Yılda 100 bin yıldırım Türkiye'ye düşer, çoğu kırsal alanda. Doğru topraklama olmazsa: **ölü cihaz + yangın + can güvenliği riski**. Bu rehber 3 farklı topraklama tipi (electrical safety + RF + lightning) + pratik kurulum + sigorta.

## 3 farklı "topraklama"

Çoğu amatör operatörünün karıştırdığı önemli ayrım:

### 1\. Electrical Safety Ground (PE, koruma topraklaması)

-   **Amaç:** Kısa devre durumunda akım yere → operatör korunur
-   TS-EN standartı: yeşil-sarı tel
-   Ev şebekesinin parçası, electrical panelden
-   Telsiz chassis bu toprağa bağlı
-   **Yıldırım koruması değildir** — kısa devre içindir

### 2\. RF Ground

-   **Amaç:** Anten için "diğer yarısı" (vertical antenne için), CMC akışı
-   Yüksek frekansta toprak iletkenliği özel
-   Kısa, kalın bağlantı (yüksek frekansta uzun ince tel = yüksek empedans)
-   Vertical anten radyalleri RF ground görevi yapar

### 3\. Lightning Ground

-   **Amaç:** Yıldırım enerji yere yönlendirme
-   Çok kalın bakır kablo (AWG 4+ veya bakır şerit)
-   Geniş yüzeyli toprak çubuğu (2m+ derin)
-   Lightning arrestor üzerinden geçer
-   Diğer iki ground'dan ayrı / izole

### Bonded ground system (en iyi)

Profesyonel istasyon: 3 ground sistemi **tek toprak çubuğunda birleştirilir**, ground potential differences (ground loops) önlenir.

## Toprak çubuğu (Türkiye için)

### Tip

-   **Galvanized steel rod** (galvanizli çelik) — en yaygın
-   2m boyunda, 16-20mm çap
-   Toprağa derinden çakılır

### Yer seçimi

-   **Nemli toprak** — kuru olmasın
-   **Bina dışı**, evden 30 cm uzaktan
-   Beton temelden uzak
-   Birden fazla çubuk → **3 metre arayla** dağıtılmış

### Bağlantı

-   **Bakır şerit** (50mm × 2mm) veya **kalın tel** (AWG 6+)
-   Çelik çubuğa **lehim değil bracket clamp** (lehim oksitlenir)
-   Kalın bağlantı → bina topraklama panosuna
-   Kalın bağlantı → telsiz oda toprağına

## Lightning arrestor (yıldırım koruyucusu)

Anten ↔ telsiz arasında, yüksek voltaj enerjiyi yere yönlendirir.

### Tipler

-   **Gas discharge tube (GDT)** — yaygın amatör
-   **Spark gap** — eski teknoloji, ucuz
-   **Polyphaser** (premium) — koaks hattı için pro
-   **Coaxial transient surge protector** — modern entegre

### Önerilen modeller

| Marka | Tip | Güç | Fiyat |
| --- | --- | --- | --- |
| **Polyphaser IS-50UX-C0** | UHF coax | 1500W | ~$100 |
| **Diamond LA-1** | VHF/UHF | 200W | ~$80 |
| **Alpha Delta TT3G50** | 3 hatlı | 1500W | ~$200 |
| **MFJ-272V** | Multi-arrestor | budget | ~$30 |

### Nereye monte?

-   Bina dışında, koaks içeri girmeden hemen önce
-   Toprak çubuğuna **kısa, kalın** kablo ile bağlı
-   Ev içine alma — kapalı alanda yıldırım enerji ölümcül

### "Ground bulkhead"

Profesyonel kurulumlarda metal panel duvar dışına monte edilir, **tüm koakslar bu paneli geçer**. Her koaks lightning arrestor üzerinden, panel direkt toprak çubuğuna kalın bakır şerit ile.

## Ground loop önleme

İki noktası farklı potansiyele sahip topraklamalar varsa → ground loop akımı:

-   RFI hum
-   Common-mode current
-   Statik şok bazen

### Çözüm: tek nokta ground (single-point ground)

-   Tüm ground bağlantıları **tek bir noktada birleşir**
-   Telsiz chassis, anten cihazı, bilgisayar — hepsi tek toprak baracına gider
-   Bara → toprak çubuğu

### Pratik

-   Telsiz odasında **ground bus bar** (bakır şerit)
-   Tüm cihazların ground tellerini bu bara yönlendir
-   Bara'dan **tek tel** ev electrical ground'a + lightning toprak çubuğuna

## Fırtına protokolü

Yaklaşan fırtına alarmında ne yap?

### Pratik adımlar

1.  **Telsizleri kapat** + güç kablosunu çek
2.  **Koaks kablolarını** lightning arrestor'dan **çıkar** (en güvenli — fiziksel disconnect)
3.  **Bilgisayar / dijital cihazlar** outlet'ten çek
4.  **Anten kablolarını** mümkünse evden tamamen sök, dışarıda bırak
5.  Telefon kablosu → unplug
6.  Fırtına geçtikten **30 dk sonra** test et

### Akıllı yaklaşım

-   Yaz ayları (fırtına sezon) öncesi sigortalı olduğunu kontrol et
-   Yıldırım dakikada 50 km hızla gelir — son anda tepki vermek için zaman yok

## Sigorta

### Ev sigortası

-   Çoğu ev poliçesi yıldırım hasarını **kapsar** (electronics dahil)
-   Anten + telsiz parça için **ek poliçe** sorulmalı
-   Maks geri ödeme 10-50K TL standart

### Amatör radyo özel sigortası

-   Türkiye'de yok (US'de ARRL üzerinden var)
-   Aksaray Sigorta veya Ferdi Kaza poliçeleri ile kapsanabilir

## RF ground (vertical için)

Vertical antenne için ground iletkenliği = anten verim. [Vertical detay tutorial →](/tutorials/dikey-vertical-anten-detay).

### Ev içi RF ground

Apartman 5. kat → toprak çubuğu mümkün değil:

-   **Counterpoise** = vertical'ın altına gerilen 4-8 radyal (yarım dalga) → sanal ground
-   **Tuner ground** — telsiz tunner kabloyu ground'a bağlar (CMC azaltma)
-   **Common-mode choke** ile feedline'ı izole

## Common-mode current (CMC)

[Apartman tutorial](/tutorials/apartmanda-amator-telsizcilik) ile [balun tutorial](/tutorials/balun-yapimi-rehberi)'ında değindik. RF güvenliği açısından:

### Belirti

-   Mikrofona şok aldığında
-   TX yaparken bilgisayar bozulduğunda
-   Ev içi cihazlarda RFI

### Çözüm

-   1:1 current balun anten besleme noktasında
-   Coax choke ferrit (5-10 sarım Mix-43)
-   Filter — low-pass HF için

## Yıldırım istatistikleri (Türkiye)

-   Yıllık ortalama: **100,000 yıldırım**
-   En yoğun bölgeler: Karadeniz sahili, Trakya, Doğu Anadolu yaz aylarında
-   Yıldırım vuruşunun **3 km mesafesi** = riskli zone (induced surge bile cihaz öldürür)
-   Direkt vuruş çok nadir — ama induced surge sıkça hasara yol açar

## "Faraday cage" yaklaşımı (extreme)

Profesyonel broadcast tower'larda:

-   Verici binası tam metal kaplama (Faraday cage)
-   Tüm girişler arrestor'dan geçer
-   Bina kendisi yıldırım çağırıcı, ama içeride güvenli

Amatör için aşırı — pratik değil. Tek-nokta ground + arrestor yeterli %95 koruma sağlar.

## Adım adım kurulum (sabit istasyon)

### Malzeme listesi (~3000 TL)

-   1× galvanizli toprak çubuğu (2m, 16mm) — 200 TL
-   5m bakır şerit (50mm × 2mm) — 500 TL
-   1× Polyphaser IS-50UX-C0 — 3000 TL ($100)
-   Bracket clamp + cıvata 200 TL
-   AWG-6 bakır tel 10m — 400 TL

### Adım 1: Toprak çubuğu çakma

-   Çubuğu evden 30 cm dışında, **toprak nemliyse direkt** çekiç ile çakla
-   Kayalık zeminde elektrikli kazma gerek
-   80% derinlikte (1.6-1.8m) yeter

### Adım 2: Bakır şerit dikey indirme

-   Bina dış cephesinden çubuğa
-   Plastik kelepçe ile sabitle (5cm aralık)
-   Çubuğa bracket clamp ile bağla

### Adım 3: Lightning arrestor

-   Bina dış duvarda, anten kablosu giriş noktasında
-   30 cm'lik kalın bakır tel ile çubuğa
-   Anten kablosu içeri girmeden önce arrestor üzerinden

### Adım 4: Bina içi ground bus

-   Telsiz odasında 50cm bakır şerit duvar
-   Telsiz, bilgisayar, tuner — hepsi bara'ya
-   Bara'dan tek tel evin elektrik ground'una + lightning toprağına

### Adım 5: Test

-   Multimetre: bara ↔ outlet ground arasında **0Ω** (continuity)
-   Bara ↔ toprak çubuğu arasında **<1Ω**

## Sık sorulan sorular

### Apartmanda lightning protection mümkün mü?

Sınırlı. Bina ortak topraklaması var — kendi anteni o sisteme dahil et. Lightning arrestor kullanmaya devam, fırtınada koaks sök.

### Toprak çubuğunu kendim çakabilir miyim?

Evet, kalın çekiç ile galvanize çubuğu nemli toprağa kolay çakılır. Kayalık zeminde elektrikli kazma şart.

### Multipoint ground kötü mü?

Multipoint ground = ground loop riski. **Single point ground** her zaman tercih.

### Ne kadar sık test etmeliyim?

-   Yıllık 1× kez bara ↔ çubuk continuity
-   Sonbahar başında (fırtına sezon öncesi)
-   Lightning arrestor cihazına bakım gerek mi diye bak (her 5 yılda bir değiştir)

### Topraklama yıldırımı çeker mi?

Hayır — toprak çubuğu pasif, vurmuş yıldırımı **dışarı yönlendirir**. Vurmamış yıldırımı çekmez. Aksini iddia eden bilim dışı.

* * *

## İlgili kaynaklar

-   [RF güvenliği ve sağlık](/tutorials/rf-guvenligi-ve-saglik)
-   [Apartmanda amatör telsizcilik](/tutorials/apartmanda-amator-telsizcilik) — apartman ground
-   [Vertical anten detay](/tutorials/dikey-vertical-anten-detay) — RF ground
-   [Balun yapımı](/tutorials/balun-yapimi-rehberi) — CMC
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — topraklama makaleleri
