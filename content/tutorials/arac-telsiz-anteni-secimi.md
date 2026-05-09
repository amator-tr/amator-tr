---
title: 'Araç Telsiz Anteni Seçim Rehberi — Mıknatıslı mı, NMO mu?'
description: >-
  Araç telsiz anteni seçimi — mıknatıslı (mag mount) vs vidalı (NMO), kapasitif
  kuplaj farkı, RF feedback sorunları (ECU/ABS parazit), topraklama, kablo
  geçişi, mobile kurulum.
keywords:
  - araç
  - mobile
  - anten
  - NMO
  - mag mount
  - topraklama
article_section: araç
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Mıknatıslı anten gerçekten kötü mü?
    a: >-
      Kısa mesafe, düşük güç (5W) için OK. 50W+ HF mobile için NMO/sabit montaj
      zorunlu.
  - q: Anten yıkandığında sorun olur mu?
    a: >-
      Hayır — anten dış mekan tasarım. Sadece konnektörlere su girmesin (PL-259
      veya NMO tabanı zaten su dirençli).
  - q: Araç camına yapıştırılan "cam anten" çalışır mı?
    a: >-
      VHF/UHF'te zayıf ama çalışır. HF'te pratik değil. Cam anten = son çare
      (karoser anteni tercih).
  - q: Birden fazla anten aynı araca?
    a: >-
      Evet — 2m/70cm çatıda + HF bagajda yaygın. Arada minimum 50cm mesafe
      (coupling azalt).
  - q: En ucuz araç setup?
    a: >-
      - Baofeng UV-5R (600 TL) + Nagoya UT-108UV mıknatıslı (500 TL) = 1100 TL
      ---
---
Araçta amatör telsiz kullanıyorsun ama sinyal zayıf, SWR garip, mikrofonla konuşurken elin "ısırıyor". Sorun büyük olasılıkla **anten montaj tipi + topraklama**. Bu rehber araç anteni seçimi + montaj + RF feedback çözüm.

## İki montaj tipi

### 1\. Mıknatıslı taban (Mag Mount)

Aracın tavanına mıknatısla tutunan anten. Delik açılmaz, çıkartılabilir.

**Nasıl çalışır:**

-   Mıknatıs aracın metal yüzeyine yapışır
-   Anten ve araç şasisi arasında **doğrudan metal teması yok** — arada boya + koruyucu ped var
-   Topraklama **kapasitif kuplaj** ile sağlanır (endirekt, RF akım kapasitör gibi akar)

**Avantajları:**

-   Delik yok, araç hasarı yok
-   Hızlı takıp çıkar
-   Kiralık araç / geçici kullanım için ideal

**Dezavantajları:**

-   Kapasitif kuplaj yüksek güçte (50W+) yetersiz → SWR dengesizleşir
-   Kablo genellikle **kapı fitili arasından** geçer → zamanla kablo ezilir → empedans bozulur, kısa devre riski
-   Yüksek hızda / off-road'da fırlama riski
-   Ground plane (yansıtıcı yüzey) kalitesi düşük

### 2\. Sabit montaj (NMO / SO-239 mount)

Aracın tavanına, bagaj kenarına veya yağmur kanalına **delik açılarak** veya kelepçeyle sabitlenen anten. Araç metal şasisiyle **doğrudan fiziksel temas**.

**Nasıl çalışır:**

-   Anten tabanı metal kaportaya vidalanır
-   Doğrudan topraklama — en düşük empedans yolu
-   Kablo araç trimlerinin altından, ezilmeden geçer

**Avantajları:**

-   En düşük SWR, en yüksek RF kazanç
-   Rüzgar / off-road'da sağlam
-   Kablo korunmuş (trim altında)

**Dezavantajları:**

-   Araçta delik açma gerekli (veya yağmur kanalı kelepçe)
-   Kalıcı montaj — sökme zor

## Topraklama: antenin görünmez yarısı

Araç anteni **monopol** — yani sadece yukarı uzanan çubuk. Diğer yarısı **aracın metal gövdesidir**. Gövde "ayna" gibi RF enerjiyi yansıtır.

### İyi topraklama belirtisi

-   SWR 1.5 altı, stabil
-   Sinyal kuvvetli, net
-   RF feedback yok

### Kötü topraklama belirtisi

-   SWR 3+ ve kararsız (hareket halinde değişiyor)
-   Sinyal zayıf
-   **RF feedback**: aracın ECU (motor beyni), ABS, müzik sistemi bozuluyor
-   Mikrofona dokunduğunda **RF yanığı** — elin ısırıyor

### Topraklama iyileştirme

1.  **Boya çizme**: anten tabanı vidalarının boyayı hafifçe çizip metale değdiğinden emin ol
2.  **Bakır örgü köprü**: anten aparatı ile araç şasisi arasına kısa (20cm) kalın bakır örgü kablo bağla — ek toprak yolu
3.  **NMO montaj**: mıknatıslıdan NMO'ya geçiş — en kesin çözüm

## RF feedback sorunu (detaylı)

Kötü topraklama → RF geri dönüşü → **koaksın dış zırhı** anten gibi davranır → RF enerjisi telsize, araba elektroniğine geri akar.

### Belirtiler

-   Mikrofona dokunduğunda eller **karıncalanır veya yanar** (RF burn)
-   Araba **müzik sistemi** TX sırasında bozulur / parazitli ses
-   **Motor ECU / ABS** hata ışığı yanar (nadir ama raporlanmış)
-   Laptop / tablet TX sırasında donuyor

### Çözüm akışı

1.  **Topraklamayı düzelt** (bakır örgü + boya çiz)
2.  **Ferrit choke** koaks hattına (telsiz girişinden önce 5-10 sarım Mix-43)
3.  **RF feedback filtre**: telsiz DC giriş kabloya ferrit clip-on
4.  **Güç düşür**: 25W → 5W (RF feedback genelde yüksek güçte)
5.  Hâlâ devam ediyorsa → anten pozisyon değiştir (araç merkezinden uzaklaş)

## Anten tipi seçimi

### VHF/UHF dual-band (2m + 70cm)

-   **Diamond NR-770H** (~2000 TL) — 1.0m, 3.0 dBi (2m), 5.5 dBi (70cm)
-   **Nagoya UT-108UV** (~500 TL) — küçük, mıknatıslı
-   **Comet SB-15** (~1500 TL) — kısa (15cm), gizli

### HF mobile

-   **Hustler resonator** — tek bant, değiştirilebilir coil
-   **ATAS-120A** (Yaesu) — otomatik tuning screwdriver anten
-   **Tarheel antennas** — motorlu, remote tuning

### Dual purpose (VHF + HF)

-   Hustler body + VHF whip üst kısım
-   İki ayrı anten (biri çatı ortası, biri bagaj)

## Kablo geçişi

### Doğru

-   Kablo araç **trim paneli altından** geçer
-   Kapı eşiği plastik kapak kaldırılır, kablo altta, tekrar kapatılır
-   Kablo asla ezilmez

### Yanlış (mıknatıslı anten sorunu)

-   Kablo **kapı fitili arasından** geçer
-   Her kapı açma/kapamada kablo ezer
-   1-2 ay sonra koaks dielektriği bozulur → empedans 50Ω'dan sapar
-   SWR bozulur, sinyal kayıp

### Çözüm

-   **Flat coax** (yassı kablo) kapı arasından geçirme — daha dayanıklı
-   Veya **bulkhead connector** araç panelinden geçirerek (delik açma gerek)

## Anten pozisyonu

### Çatı merkezi (en iyi)

-   Omnidireksiyonel mükemmel pattern
-   Araç gövdesi tam ground plane
-   SWR en düşük

### Bagaj kenarı (yaygın)

-   Pattern biraz asimetrik (öne veya yana yatkın)
-   Ama pratik (delik açmadan kelepçe ile)
-   SWR biraz yükse (~0.3 fark)

### Tampon / arka cam (kötü)

-   Ground plane yetersiz
-   Pattern çok asimetrik
-   SWR yüksek

## Mobile kurulum ipuçları

### 1\. DC güç

-   Telsiz akü'den **doğrudan** çek (direkt + ve - kutba)
-   Sigara çakmağından çekme → voltaj düşme + gürültü
-   10A sigorta seri bağla
-   AWG-10 kalın kablo (kısa mesafe bile)

### 2\. Gürültü bastırma

-   Araba alternatör gürültüsü → DC kabloda ferrit
-   Enjektör gürültüsü → ateşleme kablosuna ferrit
-   LED far → HF'te broadband noise (LED ampul değiştir)

### 3\. Ergonomi

-   Mikrofon hands-free (PTT ayağa)
-   Frekans tuşları ulaşılabilir yerde
-   Ekran gece modu (kararık)

### 4\. Yasal

-   Türkiye'de araçta telsiz kullanımı **lisanslı operatöre serbest**
-   Aracın trafiğe çıkış belgelerinde telsiz beyanı şart değil
-   Anten yüksekliği **sınırsız** ama park altı geçiş dikkat (çatı anten kırılabilir)

## Pratik test akışı

Yeni anten taktın, her şey OK mi?

### 1\. SWR testi

-   SWR metre veya NanoVNA ile
-   Telsiz + anten + koaks tam bağlı, araç açık alanda
-   145.000-148.000 MHz sweep (2m)
-   SWR < 1.5 tüm bant → mükemmel

### 2\. RF feedback testi

-   5W ile TX → mikrofona dokun, karıncalanma var mı?
-   25W → aynı test
-   50W → aynı test
-   Araba elektroniği bozuluyor mu?

### 3\. Pattern testi (pratik)

-   Arkadaşla 10 km mesafede 4 yön test
-   Her yönde sinyal eşit mi? Çatı merkezi → eşit. Bagaj → öne güçlü.

## Sık sorulan sorular

### Mıknatıslı anten gerçekten kötü mü?

**Kısa mesafe, düşük güç (5W) için OK.** 50W+ HF mobile için NMO/sabit montaj zorunlu.

### Anten yıkandığında sorun olur mu?

Hayır — anten dış mekan tasarım. Sadece konnektörlere su girmesin (PL-259 veya NMO tabanı zaten su dirençli).

### Araç camına yapıştırılan "cam anten" çalışır mı?

VHF/UHF'te zayıf ama çalışır. HF'te pratik değil. Cam anten = son çare (karoser anteni tercih).

### Birden fazla anten aynı araca?

Evet — 2m/70cm çatıda + HF bagajda yaygın. **Arada minimum 50cm mesafe** (coupling azalt).

### En ucuz araç setup?

-   Baofeng UV-5R (600 TL) + Nagoya UT-108UV mıknatıslı (500 TL) = 1100 TL

* * *

## İlgili kaynaklar

-   [Vertical anten detay](/tutorials/dikey-vertical-anten-detay) — ground plane prensip aynı
-   [Koaksiyel kablo seçimi](/tutorials/koaksiyel-kablo-secimi)
-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [RF gürültü tipleri](/tutorials/rf-gurultu-tipleri-bastirma) — araç gürültü
-   [İlk telsiz satın alma](/tutorials/ilk-telsiz-satin-alma-rehberi)
-   [Konnektör su yalıtımı](/tutorials/konnektor-su-yalitim-uvkoruma)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — araç anten makaleleri
