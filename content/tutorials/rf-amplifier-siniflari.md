---
title: RF Amplifier Sınıfları (Class A/B/C/D/E/F) — Verimlilik Sırları
description: >-
  RF güç amplifier sınıfları detaylı — Class A (lineer), Class C (FM), Class D
  (digital switching), Class E. Verim hesabı, harmonik distortion, hangi mod
  hangi sınıf gerektirir?
keywords:
  - RF
  - amplifier
  - Class A
  - Class C
  - theory
  - güç
article_section: RF
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Lineer" amp = hep Class AB mi?
    a: >-
      Evet pratikte. Class A da lineer ama verim çok düşük. Class B push-pull
      lineer ama crossover distortion. Class AB altın orta nokta.
  - q: FM amp ile SSB yapılır mı?
    a: >-
      Hayır — FM amp Class C, SSB zarfı bozar (Donald Duck distortion). SSB için
      Class AB lineer şart.
  - q: CW sabit zarf mı?
    a: >-
      Yaklaşık. Mors kodu on/off → ideal "rect signal", DC + brief envelope.
      Class C OK ama "click" (key-click) önlemek için yumuşak attack/decay shape
      lazım.
  - q: Tüp amp tehlikeli mi?
    a: >-
      Yüksek voltaj (2-3 kV) ölümcül. Modern solid-state ucuz + güvenli. Yine de
      tüpler safer than expected çünkü kapasitör discharge zaman alır → şok
      verme şansı kısıtlı (uzun süre güçsüz değil ama ufak teması tolere eder).
      ---
---
100W lineer + 100W FM amplifier — aynı güç ama tamamen farklı tasarım. **Class A, B, C, D, E, F** harfleri amplifier topolojisini ifade eder; verim, doğrusallık (linearity) ve uygulamayı belirler. Bu rehber 6 ana sınıf + amatör radyo'da hangisi nerede.

## Niye sınıflar var?

RF güç amplifier'ında 2 zıt hedef:

### 1\. Linearity (doğrusallık)

-   Sinyal şeklini bozmaz
-   AM, SSB, dijital modlar gerektirir
-   **Lineer amplifier** sayılır
-   Düşük verim (max %50)

### 2\. Verim (efficiency)

-   Watt verimini DC'den RF'e çevirme oranı
-   Yüksek verim = az ısı, az batarya tüketimi, küçük heatsink
-   **Switching amplifier** sayılır
-   Yüksek verim (max %90+)
-   Ama doğrusallık yok — sadece sabit zarflı sinyaller (FM, CW)

Bu tradeoff'u **operating bias** ayarlayarak kontrol edersin → sınıflar.

## Class A

Transistor / tüp **sürekli iletkende** (full-on, hep akım çekiyor).

### Özellikleri

-   **Verim:** %25 (teorik max %50)
-   **Linearity:** Mükemmel
-   **Distortion:** Çok düşük (-50 dB)
-   **Bias:** Tam transistör IC'sinin orta noktası
-   **Isı:** Sürekli akım = sürekli ısı, büyük heatsink
-   **Maliyet:** Yüksek (büyük transistör + soğutma)

### Kullanım

-   Receiver pre-amplifier (LNA)
-   Hassas linear amp — pahalı eve istasyonu
-   Düşük güç (≤10W) clean signal

### Amatör radyoda

**Az kullanılır** — verimi düşük olduğundan büyük güçler için pratik değil.

## Class B

Transistor cycle'ın **yarısında** iletken (180° conduction).

### Özellikleri

-   **Verim:** ~%70 (lineer limit)
-   **Linearity:** İyi (push-pull konfigürasyonda mükemmel)
-   **Crossover distortion:** İki transistör tam yarıda crossover'da küçük distortion var
-   **Bias:** Cutoff'da

### Push-pull konfigürasyonu

İki transistör çift olarak çalışır:

-   Q1 → pozitif yarım cycle
-   Q2 → negatif yarım cycle
-   Tam sinyal birlikte

### Kullanım

-   HF lineer amplifier (klasik tüp tasarımları)
-   SSB / AM kompleks zarf

### Amatör radyoda

**Class AB** (B'nin ufak modifikasyonu) en popüler — küçük bias akımı crossover distortion'i çözer, hâlâ %60-65 verim.

## Class AB (en yaygın amatör)

Class A + B karışımı. Cutoff'tan biraz açıkta bias.

### Özellikleri

-   **Verim:** %50-65
-   **Linearity:** Çok iyi (crossover distortion minimum)
-   **Distortion:** -35 ile -45 dB
-   **Bias:** Cutoff + biraz akım

### Kullanım

-   **HF SSB amplifier** — Yaesu FL-2100, Heathkit SB-1000, Henry 2K
-   **Modern transceiver** dahili amp (IC-7300 vs)

### Türkiye'de

A sınıfı lisans operatörlerin kullandığı 1kW HF amplifier'ları çoğunlukla **Class AB tüplü** (3-500Z, GU-74B vs).

## Class C

Transistor cycle'ın **küçük bir kısmında** iletken (≤180°, genelde 90-150°).

### Özellikleri

-   **Verim:** %75-85
-   **Linearity:** Yok (highly non-linear)
-   **Distortion:** Çok yüksek
-   **Sadece sabit zarflı sinyaller** — FM, CW, frequency-modulated digital

### Kullanım

-   **VHF/UHF FM amplifier** — Yaesu FT-857 dahili PA (FM modu)
-   **AM broadcasting** plate-modulated transmitter
-   **CW-only** amatör amplifier

### Amatör radyoda

-   2m / 70cm röle PA'larında yaygın
-   "FM-only" amp — SSB yapamaz (distortion'i kaldırılamaz)

## Class D (switching)

Transistor **tam on / tam off** (binary). PWM (Pulse Width Modulation) ile.

### Özellikleri

-   **Verim:** %85-95
-   **Linearity:** PWM'in doğrusallığına bağlı
-   **Bandwidth:** Düşük frekansta iyi (1 MHz altı)
-   **Filter zorunlu** — output PWM'den ses sinyalini geri çıkartır

### Kullanım

-   Audio amplifier (Class D ses amp ucuz, popüler)
-   Düşük frekans RF (1.5 MHz AM broadcasting)
-   HF amp denemeleri (pratik değil)

### Sınırlama

Yüksek frekansta switching loss → verim düşer. HF amatörde genelde Class D **az kullanılır**.

## Class E (high-efficiency switching)

Class D'nin yüksek frekans optimize edilmiş versiyonu. Transistor switching kaybını minimize eden timing.

### Özellikleri

-   **Verim:** %90-95
-   **Linearity:** Yok (sabit zarflı)
-   **Tasarım kompleks** — LC tank circuit kritik
-   **Frequency band sınırlı** — tasarlandığı frekansta zirvede

### Kullanım

-   **Ham radio FM amp** modern tasarımları
-   Cep telefon CDMA/LTE PA
-   ISM band (433 MHz, 900 MHz) ucuz transmitters

### Amatör radyoda

Class E denemeleri var ama mainstream değil — Class C basit + ucuz, hâlâ lider.

## Class F (high-efficiency)

Class C'nin **harmonic terminating** versiyonu — tank circuit harmoniklere bias yapar.

### Özellikleri

-   **Verim:** %85-90
-   **Linearity:** Yok
-   Designed for **single frequency** efficiency

### Kullanım

-   HF tüplü transmitters (1 kW seviyesi)
-   Endüstriyel ısıtma (1.8-30 MHz)

## Pratik amatör senaryolar

### Senaryo 1: HF SSB DX

**Class AB** lineer — IC-7300 dahili, veya 1kW external linear (Ameritron AL-80B).

-   Verim ~%55
-   Mükemmel linearity (SSB için zorunlu)
-   Pahalı (büyük tüp + transformatör)

### Senaryo 2: VHF FM röle PA

**Class C** veya Class E — sürekli FM, sabit zarf.

-   Verim ~%80
-   Distortion önemsiz (FM için)
-   Ucuz, küçük

### Senaryo 3: HF FT8 dijital

**Class AB** — dijital modlar lineer amp gerektirir, Class C distortion FT8 BPSK shape'i bozar.

-   50-100W yeter
-   Düşük güç class AB transistör (MRF150)

### Senaryo 4: CW QRP

**Class C** OK — CW sabit zarflı, distortion sorun değil.

-   Yüksek verim → batarya kullanımı az
-   5W için MRF101 transistör + Class C tasarımı

### Senaryo 5: Kit/DIY HF amp

**Class AB push-pull** — en popüler kit topolojisi.

-   100W çıkış, 200W DC giriş
-   2× MRF150 transistör
-   Toroid bandpass filter çıkışta

## Verim hesabı (pratik)

100W RF çıkış → DC giriş:

| Sınıf | DC giriş | Heatsink ısı |
| --- | --- | --- |
| Class A | 400W | 300W ısı (büyük heatsink!) |
| Class AB | 165W | 65W ısı |
| Class B | 145W | 45W ısı |
| Class C | 130W | 30W ısı |
| Class D/E | 110W | 10W ısı |

İlginç: Class A 100W için **400W güç kaynağı + masif heatsink**. Bu yüzden A sınıfı sadece düşük güçte (10W altı) pratik.

## Tüp vs solid-state

### Tüplü amplifier (klasik)

-   1 kW + amplifier'da hâlâ kullanılır
-   3-500Z, GU-74B, EIMAC tüpler
-   High voltage (2-3 kV) — **tehlikeli** ama hatalara karşı toleranslı
-   SWR kaçıklığında hemen yanmazlar — kızarır ama çalışmaya devam eder
-   30-50 yıl ömür
-   Tamir kolay (büyük bileşen, görünür devre)

### Solid-state (modern — LDMOS / MOSFET)

-   IRF510, MRF150, BLF188XR LDMOS transistör
-   Düşük voltaj (28-50V)
-   Compact, verimli, soğuk çalışan
-   **DİKKAT: çok hassas** — en küçük aşırı akımda, statik elektrikte veya SWR spike'ında **saniyeler içinde "mefta" olabilir**. Tüplerin toleransı burada yok
-   Homebrew'da ESD (statik) bileklik zorunlu, topraklama kritik
-   5-10 yıl ömür (kapasitör + transistör yaşlanması)
-   IC-7300 gibi modern transceiver dahili 100W LDMOS PA

### Türkiye'de

A sınıfı operatörlerin %60'ı tüplü amp kullanıyor (Heathkit, Yaesu FL-2100, Russian GU-74). %40 modern solid-state. Tüpler ikinci el ucuz, parça bulunabilir.

## Linearity ölçüsü: IMD (Intermodulation Distortion)

Lineer amp'ın "ne kadar linear" ölçüsü:

### IMD3 (3rd-order intermodulation)

İki sinyal beslenince çıkışta üretilen 3. dereceden distortion product.

-   IMD3 < -30 dB → çok iyi
-   IMD3 < -25 dB → iyi
-   IMD3 > -20 dB → "splatter" (komşu kanallara yayılma)

### Contest splatter

Yüksek IMD3 amplifier 2 kHz aralıklı operatörleri rahatsız eder. Telsizci etiketi: clean signal = saygı.

## Bias ayarlama (DIY)

Class AB amp tasarımı:

-   **Quiescent current** (idle akım) optimal value
-   200-300 mA bias akımı, 100W amp için
-   Çok düşük → crossover distortion
-   Çok yüksek → Class A'ya yaklaşır, verim düşer

### Test

-   IMD analyzer veya spectrum analyzer ile output gözle
-   IMD3 minimum bias akımı bul
-   O noktada sabit tut

## Sık sorulan sorular

### "Lineer" amp = hep Class AB mi?

Evet pratikte. Class A da lineer ama verim çok düşük. Class B push-pull lineer ama crossover distortion. Class AB altın orta nokta.

### FM amp ile SSB yapılır mı?

**Hayır** — FM amp Class C, SSB zarfı bozar (Donald Duck distortion). SSB için Class AB lineer şart.

### CW sabit zarf mı?

Yaklaşık. Mors kodu on/off → ideal "rect signal", DC + brief envelope. Class C OK ama "click" (key-click) önlemek için yumuşak attack/decay shape lazım.

### Tüp amp tehlikeli mi?

Yüksek voltaj (2-3 kV) ölümcül. Modern solid-state ucuz + güvenli. Yine de tüpler **safer than expected** çünkü kapasitör discharge zaman alır → şok verme şansı kısıtlı (uzun süre güçsüz değil ama ufak teması tolere eder).

* * *

## İlgili kaynaklar

-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [Modülasyon AM/FM/SSB](/tutorials/modulasyon-am-fm-ssb-detay)
-   [dB/dBi/dBd anten kazancı](/tutorials/db-dbi-dbd-anten-kazanci)
-   [İlk telsiz satın alma](/tutorials/ilk-telsiz-satin-alma-rehberi)
-   [RF güvenliği](/tutorials/rf-guvenligi-ve-saglik)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — RF amp makaleleri
