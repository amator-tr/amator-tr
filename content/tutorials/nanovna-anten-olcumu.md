---
title: 'NanoVNA ile Anten Ölçümü — SWR, Smith Chart, Kalibrasyon'
description: >-
  NanoVNA — $100'lık vector network analyzer ile anten SWR ölçümü, OSL
  kalibrasyon, Smith chart okuma, anten ayar sürecinde adım adım pratik
  kullanım.
keywords:
  - nanovna
  - swr
  - smith-chart
  - anten
  - ölçüm
  - vna
article_section: nanovna
published_at: '2026-04-25'
updated_at: '2026-04-25'
faq:
  - q: Yeni başlayan için $5000 ekipman almalı mıyım?
    a: >-
      **Hayır** — NanoVNA-H amatör için yeter. $5K Keysight =
      laboratuvar/akademik
  - q: Pil ne kadar dayanır?
    a: NanoVNA-H4 ~3 saat sürekli sweep. USB-C ile sürekli güç verebilir
  - q: Ekran çatladığında ne yapayım?
    a: Yedek LCD modülü var (eBay $20). Self-replacable
  - q: 'Kalibrasyon kit''i ucuz, sonuç güvenilir mi?'
    a: >-
      Ücretsiz gelen ucuz kit OK; profesyonel için $200 kalibrasyon kit
      alabilirsiniz (1 ppm precision)
  - q: 6 GHz ölçüm yapabilir miyim?
    a: LiteVNA-64 ile evet. NanoVNA-H ile 1.5 GHz max
  - q: Capacitor / inductor ölçümü?
    a: 'Smith chart''ta görünür — capacitor sol-alt, inductor sol-üst sektörde'
  - q: Koaks kayıplarını ölçebilir miyim?
    a: Through mode + bilinen-uzunluk koaks → dB/m attenuation hesaplanabilir
  - q: 'Renkler ne anlama geliyor (Trace 0, 1, 2, 3)?'
    a: 'Sarı, mavi, yeşil, kırmızı — Display → Trace menüsünden değiştirilebilir'
---
## NanoVNA nedir, ne işe yarar?

**NanoVNA** — Çinli geliştiriciler edy555 ve hugen79 tarafından 2019'da yayımlanan, açık kaynak (GPL), **$60-100** bandında satın alınabilen **Vector Network Analyzer**. Eskiden $5000+ olan ekipmanı amatör radyoya getirdi.

VNA = "RF cihazların **frekans-tepkisini** ölçen alet". Bizim için pratikte:

-   **SWR ölçümü** (Standing Wave Ratio — anten ile telsiz arası empedans uyumu)
-   **Empedans (Z) — kompleks değer** (R + jX, gerçek ve sanal komponent)
-   **Smith Chart** — empedansın görsel temsili
-   **S11 (return loss)** — antene giden gücün ne kadarı geri döndüğü
-   **Frekans-rezonans tarama** — en iyi SWR hangi frekansta

Tek cihazla anten yapımı, filtre tasarım, koaks fault detection, kristal frekans ölçümü, hatta tüp lamba grid empedansı.

> 🛠️ **Tasarımdan ölçüme:** Anten yapmadan önce hedef boyları **[Anten Boy Hesaplayıcı](/araclar/anten-hesaplayici/)** ile çıkar; ardından NanoVNA ile gerçek SWR'ı ölç.

## NanoVNA modelleri

| Model | Frekans | Fiyat (TR) | Notlar |
| --- | --- | --- | --- |
| **NanoVNA Original** | 50 kHz - 900 MHz | 1500-2500 TL | İlk versiyon, hâlâ uygun |
| **NanoVNA-H** (Hugen) | 50 kHz - 1.5 GHz | 2000-3500 TL | İyileştirilmiş hardware, en popüler |
| **NanoVNA-H4** | 50 kHz - 1.5 GHz, 4" LCD | 3000-5000 TL | Büyük ekran, batarya uzun |
| **NanoVNA V2 (S-A-A-2)** | 50 kHz - 3 GHz | 4000-6000 TL | Daha üst frekans, dahili lityum pil |
| **LiteVNA-64** | 50 kHz - 6.3 GHz | 6000-10000 TL | Profesyonel, mikrodalga tarafı |

**Çoğu amatör için: NanoVNA-H** veya **H4**. HF (1-30 MHz) + VHF (144 MHz) + UHF (430 MHz) için fazlasıyla yeter.

## Kalibrasyon — kullanmadan önce ZORUNLU

Cihaz "kalibre değil" out-of-the-box. Her ölçüm öncesi **OSL (Open / Short / Load)** kalibrasyonu yapılmalı:

### Cihazın gelir kit'i

| Standart | Açıklama |
| --- | --- |
| **Open** (açık devre) | SMA dişi konektör, içi açık → ∞ empedans |
| **Short** (kısa devre) | SMA dişi konektör, içi kısa devre → 0 empedans |
| **Load** (50Ω terminator) | SMA dişi 50Ω yük → mükemmel match |
| **Through** (S21 için) | İki SMA-dişi karşılıklı dişi adapter |

### Kalibrasyon adımları

1.  **Stimulus → Start/Stop** — ölçeceğiniz frekans aralığı ayarla (örn. 1-30 MHz HF için)
2.  **Calibrate → Reset** — eski kalibrasyon sıfırla
3.  **Calibrate → Calibrate** menüsü:
    -   **Open** standardını CH0'a tak → OPEN tıkla
    -   Çıkar, **Short** standardını CH0'a tak → SHORT tıkla
    -   Çıkar, **Load** standardını CH0'a tak → LOAD tıkla
    -   **Through** (S21 ölçeceksen) → CH0 + CH1 arası bağla → THRU tıkla
    -   **Done**
4.  **Save → Save 0** (veya 1, 2, ...) — bu kalibrasyonu hafızaya yaz

**Kalibrasyon = ölçtüğünüz frekans aralığına özgü.** 1-30 MHz için kalibrasyonla 50-1500 MHz ölçüm yaparsanız sonuç yanlış. Her bant için ayrı kalibrasyon kaydı tutun.

## Anten SWR ölçümü — pratik adımlar

### Setup

```
[ Anten ]── koaks ── adapter ── CH0 (NanoVNA)
                                  │
                                  └── (CH1 boş, S21 yapmıyoruz)
```

### Adım 1: Frekans aralığı

Hangi antenı test ediyorsunuz?

| Anten | Sweep aralığı |
| --- | --- |
| 80m HF dipole | 3.0 - 4.5 MHz |
| 40m HF dipole/EFHW | 6.5 - 7.5 MHz |
| 20m | 13.5 - 14.5 MHz |
| **Multiband EFHW (40m primer)** | 1 - 30 MHz (geniş, tüm bantlar görünür) |
| 2m (144 MHz) J-Pole | 142 - 150 MHz |
| 70cm (430 MHz) | 425 - 445 MHz |
| Çift bant (2m+70cm) | 100 - 500 MHz |

NanoVNA limiti: 1.5 GHz (H/H4), 3 GHz (V2). 6m, 10m, 1.2 GHz hepsi destekli.

### Adım 2: Display modu

`Display → Trace → CH0`:

-   **Trace 0**: SWR (en kullanışlı — magnitude görseli)
-   **Trace 1**: Smith chart
-   **Trace 2**: |S11| (return loss, dB cinsinden)
-   **Trace 3**: Phase (faz, opsiyonel)

`Display → Format → SWR` ekranı SWR-only mod yapar.

### Adım 3: Sweep

Otomatik sürekli sweep yapar. Ekranda:

-   **Yatay eksen**: frekans (Stimulus aralığı)
-   **Dikey eksen**: SWR değeri (1.0 = mükemmel, 2.0 = kabul, > 3 = problem)

### Adım 4: Marker yerleştir

`Marker → Marker 1 → Active` — tıklayınca tek bir noktayı işaretler. Bu noktayı **tepe SWR'a** veya **dip noktasına** kaydırarak değer okur:

```
SWR
3 ─┐                                    
   │                       ╱╲
2 ─┤                  ╱   ╲             
   │             ╱        ╲       
1 ─┤   ─────────              ────────  
   │
0 ─┴────────────────────────────────────
   3.0   3.5   4.0   4.5
                     │
              ◄ marker burada: SWR = 1.18 @ 3.55 MHz
```

### Adım 5: Yorumlama

| SWR | Anten durumu |
| --- | --- |
| **< 1.3** | Mükemmel |
| **1.3 - 1.5** | Çok iyi |
| **1.5 - 2.0** | Kabul (TX güvenli) |
| **2.0 - 3.0** | Marjinal — TX gücü 50%+ kayıp, PA risk |
| **\> 3.0** | TX YAPMA — PA arızalanır |

**Dip frekansı**:

-   Hedef bant **altındaysa** (örn. 6.8 MHz, hedef 7.1) → tel **uzun**, kısalt
-   Hedef bant **üstündeyse** (örn. 7.4 MHz) → tel **kısa**, uzat

Boy ↔ frekans ilişkisi: **+5 cm = -50-100 kHz frekans** (banta göre). Az az kes, sık ölç.

## Smith Chart okuma

`Display → Format → Smith` aktive eder. Ekranda dairesel "Smith" grafiği:

```
                       j (X reaktans)
                       │
                  ╲    │    ╱
                   ╲   │   ╱
              ╲     ╲  │  ╱     ╱
              ─────────●─────────  R (direnç ekseni)
              ╱        │       ╲
                   ╲   │   ╱
                  ╱    │    ╲
                       │
                       -j (X kapasitif)
```

-   **Merkez (●)**: 50 Ω + 0j → mükemmel match (SWR 1.0)
-   **Sağ uç (∞)**: açık devre
-   **Sol uç (0)**: kısa devre
-   **Üst yarı**: indüktif (X > 0)
-   **Alt yarı**: kapasitif (X < 0)

Anten frekans-rezonans noktasında **gerçek eksende** (dış çember boyunca yatay) olur. Tipik anten ölçümünde:

-   **Düşük frekans** (resonans altında): üst yarıda (indüktif)
-   **Yüksek frekans** (resonans üstünde): alt yarıda (kapasitif)
-   **Resonans**: yatay ekseni keser (X = 0)

Anten 50Ω **resonans + 50Ω** olursa merkeze otururdu. Genelde dipole ~73Ω resonans → merkezin **biraz sağında**, hafif bir empedans tip.

## Tipik ölçüm senaryoları

### Senaryo 1: 40m EFHW SWR sweep (multiband)

Sweep 1-30 MHz:

```
SWR  4 ─┐
        │
     3 ─┤        
        │             ╱─╲                            
     2 ─┤   ╱─╲      ╱   ╲    ╱─╲      ╱─╲          
        │  ╱   ╲    ╱     ╲  ╱   ╲    ╱   ╲          
     1 ─┤─╱─────╲──╱───────╲╱─────╲──╱─────╲────────  
        │
     0 ─┴────────────────────────────────────────────
        1   3.5   7   10   14    18  21    24  28
        │       ↑              ↑              ↑
        │      40m           20m            10m
```

40m, 20m, 15m, 10m'de **dip** (low SWR) görünür. 80m'de SWR yüksek (tuner ile çalışır). Multiband EFHW karakteristik karakteri budur.

### Senaryo 2: 40m dipole — sadece tek dip

Sweep 6.5-7.5 MHz:

```
SWR  3 ─┐
        │      ╲
     2 ─┤       ╲           ╱
        │        ╲         ╱
     1 ─┤         ╲───────╱  dip 7.05 MHz, SWR 1.15
        │
     0 ─┴────────────────────
        6.5  7.0   7.5 (MHz)
```

Tek bant resonant — clean dip 7.05 MHz, SWR 1.15. Mükemmel ayar.

### Senaryo 3: 2m J-Pole

Sweep 140-150 MHz:

```
SWR  3 ─┐                    
        │ ╲╱╲                  
     2 ─┤    ╲                
        │     ╲              
     1 ─┤      ╲────────────   dip 145.5 MHz, SWR 1.3
        │
     0 ─┴────────────────────
        140  145  150
```

145.5 MHz dip — 2m amatör band ortası, SWR 1.3, harika.

## Koaks fault tespiti (TDR mode)

NanoVNA'nın gizli özelliği: **TDR (Time Domain Reflectometry)**. Koaksta nerede arıza var, kısa devre, açık, bend var?

`Display → Transform → Distance` aktive et:

-   Koaksı CH0'a tak (anten yerine)
-   Cihaz pulse gönderir, geri yansıma zamanını ölçer
-   **Mesafe** olarak gösterir (m cinsinden)

Tipik bulgular:

-   Açık devre uçta: spike + 100% reflection
-   Su girmiş bağlantı: orta-mesafede irregularity
-   Boğum/dolanma: küçük spike

100m RG-58'de 5 cm bend bile algılanabilir.

## Multi-port ölçümleri (S21 — through)

CH0 ve CH1 ikinci portu var. **Filtre tepkisi** veya **gain** ölçmek için:

```
[ Filtre / Amp DUT ]
   │                   │
   └─ CH0  /  CH1 ─────┘
```

Bant geçer filtre testinde:

-   0 dB attenuation = ideal pass
-   < -40 dB = stop band

Antene değil, ek RF cihazlarınıza için yararlı.

## Yazılım — masaüstü destek

NanoVNA ekranı küçük (2.8" / 4"). Bilgisayar üzerinden:

-   **NanoVNA-Saver** (Cross-platform, Python): [github.com/NanoVNA-Saver/nanovna-saver](https://github.com/NanoVNA-Saver/nanovna-saver) — sweep'i bilgisayara aktarır, .s1p / .s2p dosyaya kaydet, S-parameter analiz
-   **NanoVNA-App** (Windows): görsel olarak iyi
-   **NanoVNAv2** (V2 model için): farklı tool, S2VNA Studio

USB-C kablosu ile bağla, COM port → yazılım otomatik tanır.

## Sık sorulan sorular

| Soru | Cevap |
| --- | --- |
| Yeni başlayan için $5000 ekipman almalı mıyım? | **Hayır** — NanoVNA-H amatör için yeter. $5K Keysight = laboratuvar/akademik |
| Pil ne kadar dayanır? | NanoVNA-H4 ~3 saat sürekli sweep. USB-C ile sürekli güç verebilir |
| Ekran çatladığında ne yapayım? | Yedek LCD modülü var (eBay $20). Self-replacable |
| Kalibrasyon kit'i ucuz, sonuç güvenilir mi? | Ücretsiz gelen ucuz kit OK; profesyonel için $200 kalibrasyon kit alabilirsiniz (1 ppm precision) |
| 6 GHz ölçüm yapabilir miyim? | LiteVNA-64 ile evet. NanoVNA-H ile 1.5 GHz max |
| Capacitor / inductor ölçümü? | Smith chart'ta görünür — capacitor sol-alt, inductor sol-üst sektörde |
| Koaks kayıplarını ölçebilir miyim? | Through mode + bilinen-uzunluk koaks → dB/m attenuation hesaplanabilir |
| Renkler ne anlama geliyor (Trace 0, 1, 2, 3)? | Sarı, mavi, yeşil, kırmızı — Display → Trace menüsünden değiştirilebilir |

## Pratik öneri — ilk satınalma

İlk NanoVNA için:

1.  **Cihaz**: NanoVNA-H4 (4" ekran daha rahat) — ~$80
2.  **Kalibrasyon kit**: Cihazla geliyor (yeterli), profesyonel için ek $40
3.  **Adapter set**: SMA-male, SMA-female, BNC, PL-259 — ~$25 (BNC/PL adapter şart, çoğu anten BNC/PL)
4.  **Pil bank** + USB-C kablo
5.  **Yazılım**: NanoVNA-Saver (free)

**Total: ~$120-150** — amatör radyo'da değer üreten en iyi yatırım.

## Yararlı kaynaklar

-   [NanoVNA ne resmi](https://nanovna.com) — sürücü, manual, FAQ
-   [NanoVNA-Saver GitHub](https://github.com/NanoVNA-Saver/nanovna-saver) — masaüstü yazılım
-   [Boland ARC: NanoVNA SWR ölçümü adım adım](https://bark.org.za/simple-step-by-step-using-the-nano-vna-h4-to-measure-swr/)
-   [PA3A: Smith Chart in NanoVNA (PDF)](https://pa3a.nl/wp-content/uploads/2022/07/Smith-Chart-in-the-nanoVNA-2022-july-ENGLISH.pdf)
-   [WA5OKO NanoVNA User Guide (PDF)](https://amris.mbi.ufl.edu/wordpress/files/2021/01/NanoVNA-User-Guide.pdf)
-   [Keystone ARS: NanoVNA Starter Guide](https://karsqth.org/tuning-and-testing-antennas-with-the-nanovna-a-starters-guide)

## Sıradaki adımlar

-   [HF Dipole / EFHW Anten](/tutorials/hf-dipole-efhw-anten) — kurduğunuz HF antenin SWR ayarı için NanoVNA şart
-   [J-Pole / Slim Jim VHF Anten](/tutorials/anten-yapimi-temel) — VHF/UHF için NanoVNA aynı işi yapar
-   [FT8 Dijital Mod](/tutorials/ft8-dijital-mod) — anten testten sonra FT8 ile global doğrulama

73, ve "anten gerçekten çalışıyor mu" sorusuna **kesin cevap** verecek aletiniz var artık.
