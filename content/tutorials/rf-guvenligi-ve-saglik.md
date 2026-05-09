---
title: RF Güvenliği ve Sağlık — Amatör Operatörün Bilmesi Gerekenler
description: >-
  RF maruziyeti, FCC/ICNIRP/Türkiye limitleri, anten mesafe hesabı, OET-65, kalp
  pili / hamilelik / çocuk önlemleri, RF burn'ları, topraklama ve yıldırım
  koruması.
keywords:
  - RF güvenliği
  - sağlık
  - EMF
  - topraklama
  - yıldırım
article_section: RF güvenliği
published_at: '2026-04-26'
updated_at: '2026-04-26'
---
100W ile yayma yapan bir amatör operatör — antene 1m yakınsa ne kadar enerjiye maruz kalıyor? Yanıtı bilmek **sağlık** ve **yasal sorumluluk** açısından şart. Bu rehber RF güvenliğinin pratik kısmı: limitler, anten mesafe hesabı, riskli durumlar.

## RF zararlı mı?

Kısa cevap: **doğru kullanırsan değil**. Yanlış kullanırsan termal yaralanma + uzun vadeli olası riskler.

### Termal etki (kanıtlanmış)

RF enerji moleküllerin titreşimini artırır → ısı oluşur. Mikrodalga fırın aynı prensiple çalışır. Yeterli güçte deri / göz / iç organ yaralanması olur.

### Non-termal etki (tartışmalı)

Düşük seviye RF'in DNA / kanser / nörolojik etkileri konusunda 50 yıl araştırma var. WHO IARC RF'i **2B** (muhtemelen kanserojen) sınıflandırır — kahve ve turşu seviyesi. Kesin neden-sonuç **kanıtlanmadı** ama dikkat etmek mantıklı.

### SAR (Specific Absorption Rate)

Vücudun RF enerjiyi soğurma hızı — **W/kg** birimi. Su molekülleri yüksek frekanslı RF alanında titreşir → doku ısınması. **Göz merceği ve testisler** en hassas bölgeler: kan dolaşımı az olduğu için ısıyı tahliye edemezler.

### VHF bandında vücut rezonansı

İnsan vücudu boyu ve yapısı itibarıyla **VHF bantında (30-300 MHz)** bir anten gibi davranır — 144 MHz dalga boyu (~2m) insan boyuna yakın. Bu yüzden vücudumuz VHF sinyallerini HF'e göre **çok daha fazla soğurur**. Yasal güvenlik sınırları da VHF bandında HF'ten daha sıkıdır. Pratik sonuç: 2m el telsizini ağzınıza yakın tutarken dikkat — antenna başından 5+ cm uzakta tutun.

## Limit standartları

Üç dünya çapında standart:

### FCC (ABD)

-   **OET-65**: 30 cm yakında, 100W vericiyle 30 MHz'de güvenli süre / mesafe formülü
-   **MPE** (Maximum Permissible Exposure):
    -   Genel halk: 0.61 mW/cm² (3-30 MHz)
    -   Operatör: 1.0 mW/cm²

### ICNIRP (Avrupa, ICNIRP 2020)

-   **Genel halk** (uncontrolled): 2 W/m² ≈ 0.2 mW/cm²
-   **Operatör** (controlled): 10 W/m² ≈ 1.0 mW/cm²

### Türkiye (BTK + ICTA)

-   ICNIRP standartlarını benimser
-   Yüksek güç sabit istasyonlarda **EMF assessment** zorunlu
-   Mobile/el telsizi 25W altı genelde muaf

## Anten mesafe hesabı (basitleştirilmiş)

**Far-field denklemi:** $ S = \\frac{P \\cdot G}{4\\pi d^2} $

-   S = güç yoğunluğu (mW/cm²)
-   P = verici gücü (mW)
-   G = anten kazancı (linear, dB değil)
-   d = mesafe (cm)

### Örnek: 100W vertical, 7 dBi kazanç, 145 MHz

-   P = 100,000 mW
-   G = 10^(7/10) = 5
-   Hedef S < 1 mW/cm² (controlled)
-   d² = (P × G) / (4π × S) = (100,000 × 5) / (4π × 1) ≈ 39,789
-   **d ≈ 200 cm = 2 metre** (controlled environment, operatör)

Genel halk için (S = 0.2 mW/cm²): **d ≈ 4.5 metre**

### Pratik kural

-   **El telsizi 5W**: anten 5 cm uzakta tut (ağız dahil)
-   **Mobile 25W**: anten araç dışında, en az 50 cm uzak
-   **Sabit 100W**: anten en az 2-5 metre uzakta operatörden
-   **Sabit 1500W**: 6-15 metre uzaklık + EMF analiz

[FCC OET-65 calculator](https://www.fcc.gov/general/oet-bulletins-line) detaylı hesap yapar.

## Yüksek riskli durumlar

### 1\. Kalp pili (pacemaker)

Modern pacemaker'lar EMF'e karşı korumalı ama eski modeller etkilenebilir. Kural:

-   Anten ≥ **30 cm** kalp pili sahibinden uzak
-   Yüksek güç (≥100W) ile yakın kontak — pacemaker doktoruna sor

### 2\. Hamilelik

Resmi ICNIRP limitleri yeterli koruma sağlar ama precaution:

-   100W+ vericiyle yakın çalışma — 1m üstü mesafe
-   Uzun süreli (saatlerce) maruziyet — kaçın

### 3\. Çocuklar

Çocuklar daha küçük kafa → daha yüksek SAR (Specific Absorption Rate). Standartlar bunu hesaba katar ama:

-   Çocuk anten yakınında uzun süre olmasın
-   El telsizi çocuk başına yakın tutulmasın (yetişkin için OK)

### 4\. Gözler

Gözler en hassas organ — çok az kan dolaşımı, ısı atımı zayıf. Mikrodalga anteni gözüne tutma asla. 1.2/2.4/5.8 GHz Wi-Fi/Bluetooth zaten düşük güç ama dikkat.

### 5\. RF burn (deri yanığı)

Yüksek güç (100W+) anten ucunda **15 kV/m** field oluşur. Kapasitif coupling ile metal yüzeylerde "RF arc" — küçük şok ama ağrılı. Yüksek güçle çalışırken anten metaline dokunmayın yayın sırasında.

## Topraklama (electrical + RF)

### Electrical safety ground

-   Ev şebeke topraklamasıyla **bağlı** (yeşil-sarı tel) — TS-EN standartları
-   Telsizin chassis bu toprağa
-   Kısa devre durumunda akım yere → operatör korunur

### RF ground

-   Yüksek frekansta toprak iletkenliği değişir — özel RF ground sistemi gerekebilir
-   Vertical anten için **radyaller** (ground plane) görev yapar
-   Sabit istasyonda toprak çubuğu (galvanized steel rod) → bina dışında 2m derin
-   Kısa, kalın bağlantı — uzun ince tel RF'te yüksek empedans

## Yıldırım koruması

Anten = **mükemmel yıldırım çekici**. Türkiye'de yıllık ~100K yıldırım, çoğu kırsal bölgede. Önlem **zorunlu**:

### Ekipman koruması

1.  **Lightning arrestor** koaks hat üstüne — Polyphaser, Diamond LA-1
2.  **Ground rod** lightning arrestor'a bağlı
3.  **Telsiz outlet'ten çek** fırtına yaklaşırsa
4.  **Antenden kabloyu sök** (en güvenli)

### Sigorta

Ev sigortası yıldırım hasarını genelde kapsar ama **anten/telsiz parçası ek poliçe** gerekebilir. Sigorta şirketine sor.

### Kişisel güvenlik

-   Fırtına sırasında **anten dokunma** asla
-   İçeride telefon kablosu / iletken yüzeyden uzak dur
-   Anten kuran teknisyen → yıldırım algılayıcı sistem zorunlu

## RFI ve sağlık

RFI (Radio Frequency Interference) doğrudan sağlık riski değil, ama:

-   Komşu cihazları bozarsan **şikayet → BTK denetim → lisans iptali** riski
-   Tıbbi cihazlar (insülin pompası, hearing aid) etkilenebilir
-   [Apartman tutorial](/tutorials/apartmanda-amator-telsizcilik)'unda RFI önleme

## Kişisel anti-RF stratejiler

### Düşük güç felsefesi (QRP)

-   5W ile FT8 dünya çapında — neden 100W?
-   Daha az güç = daha az RF maruziyeti + daha az komşu sorunu

### Anten mesafe disiplini

-   "Ağzına yakın" anten kullanma — el telsizinde ekstra anten + boyun askısı
-   Sabit istasyonda anten dışarıda, mümkünse çatıda

### Süre kısıtlaması

-   Operatör SAR (specific absorption rate) — uzun süreli yüksek güç maruziyetinden kaçın
-   Yarış / contest için break alın, sürekli TX yapmayın

### EMF ölçer (pratik kontrol)

-   30-300 MHz EMF metre (Triarchy 980, ~$100)
-   Anten yakınında ölçüm — limitin altında olduğunu doğrula
-   Pasif RF detector odanın "sıcak nokta"larını gösterir

## Çocuklar telsiz öğrensin mi?

Kısa cevap: **evet, ama dikkatli**.

-   5W el telsizi (lisanssız C sınıfı veli izniyle çocuk lisanslı) → güvenli
-   Anten ağıza yakın olmasın (kuş omuzdan asılı dahili anten OK)
-   Çocuk amatör programı: kodlama / elektronik / fizik birlikte öğrenmek için harika

## Hukuki sorumluluk

Türkiye yönetmeliği:

-   Lisans sahibi **kendi istasyonundan kaynaklanan EMF'ten sorumlu**
-   Komşu / ailesi sağlık şikayeti açarsa → operatör hesabı vermek zorunda
-   BTK denetimi yapılırsa **istasyon ölçümü** istenebilir

İyi pratik:

1.  EMF assessment dosyası hazır tut (anten + güç + mesafe hesabı)
2.  Komşulara verici aktivite saatlerini bildir (saygı)
3.  Yüksek güç (100W+) için profesyonel inceleme yaptır

## Sonuç

| Risk | Önlem |
| --- | --- |
| RF maruziyeti | Anten 50cm-2m mesafe, gücü minimum tut |
| Kalp pili | Anten ≥30cm uzak, yüksek güç doktora sor |
| Yıldırım | Lightning arrestor + fırtınada koaks sök |
| Komşu RFI | 1:1 balun + ferrit choke + filter |
| RF burn | Anten metaline TX sırasında dokunma |
| Çocuklar | Dahili antenli el telsizi OK, anten ağıza tutma |

RF güvenliği = sağduyu + ölçü. 95% operatörün bilmediği bir konu — sen bilirsen safer + responsible operatörsün.

* * *

## İlgili kaynaklar

-   [Apartmanda amatör telsizcilik](/tutorials/apartmanda-amator-telsizcilik) — RFI yönetimi
-   [SWR temel](/tutorials/swr-temel-bilgisi) — anten kalitesi
-   [Koaksiyel kablo seçimi](/tutorials/koaksiyel-kablo-secimi) — kayıp + RFI
-   ICNIRP guidelines: [icnirp.org](https://www.icnirp.org/)
-   FCC OET-65: amatör için resmi ABD kılavuzu
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — RF güvenliği makaleleri
