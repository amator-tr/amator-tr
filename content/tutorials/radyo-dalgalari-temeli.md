---
title: 'Radyo Dalgalarının Temeli — Frekans, Dalga Boyu, Hız'
description: >-
  Radyo dalgaları fiziği temel — Maxwell denklemleri, Hertz deneyi, frekans,
  dalga boyu, ışık hızı. λ = c/f formülü, elektromanyetik spektrum, amatör radyo
  bantları.
keywords:
  - radyo dalgası
  - frekans
  - dalga boyu
  - fizik
  - Maxwell
  - Hertz
  - başlangıç
article_section: radyo dalgası
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Radyo dalgaları zararlı mı?
    a: >-
      Yüksek güçte ve yakın mesafede termal etki var. Amatör güç seviyelerinde
      (5-100W) normal mesafede güvenli. RF güvenliği →
  - q: Işık da radyo dalgası mı?
    a: >-
      Aynı fizik (Maxwell), farklı frekans. Görünür ışık ~400-800 THz, radyo 3
      kHz - 300 GHz.
  - q: Dalga boyu" neden önemli?
    a: >-
      Anten boyutu dalga boyuyla orantılı. 80m bandı için 40m dipole gerek — bu
      pratik kısıtlama hangi bandı kullanacağını belirler.
  - q: 'Sınav sorusu: λ = c/f nerede geçer?'
    a: 'KEGM sınavında en az 2-3 soru bu formülden çıkar. Ezberle, pratik yap. ---'
---
Telsizin mandalına basıyorsun — gözle görünmez bir enerji anteninden havaya yayılıyor, ışık hızıyla gidiyor, iyonosferden yansıyor, 5000 km ötedeki bir antenle buluşuyor, orada sese dönüşüyor. Bunu anlamak için Maxwell'in 1865'teki dehasına ve Hertz'in 1888'deki kıvılcımına geri dönmek lazım.

## Tarih: Maxwell'in kağıdı, Hertz'in kıvılcımı

### James Clerk Maxwell (1865)

İskoçyalı fizikçi, elektrik ve manyetizma arasındaki bağlantıyı **4 denklemle** birleştirdi. Kağıt üzerinde ispatladı: değişen elektrik alanı manyetik alan yaratır, değişen manyetik alan elektrik alan yaratır → ikisi birbirini besleyerek **ışık hızında** uzayda yayılır. Ama kimse bu "dalgaları" henüz görmemişti.

### Heinrich Hertz (1888)

Alman fizikçi, laboratuvarında kıvılcım çaktırarak Maxwell'in teorik dalgalarının **gerçekten uzayda seyahat ettiğini** kanıtladı. Birkaç metre ötedeki metal halkada kıvılcım oluştu — sinyal geçmişti. Frekans birimi **Hertz (Hz)** onun adını taşır.

### Guglielmo Marconi (1901)

İtalyan mucit, radyo dalgalarını **Atlantik'i geçirerek** ticari potansiyeli kanıtladı. İlk "kablosuz telgraf" — amatör telsizciliğin atası.

## Üçlü ittifak: hız, frekans, dalga boyu

Radyo dalgalarının tüm fiziği 3 değişken arasındaki ilişkiye dayanır:

### Formül

$\\lambda = \\frac{c}{f}$

-   **λ** (lambda) = dalga boyu (metre)
-   **c** = ışık hızı = ~300.000.000 m/s (boşlukta)
-   **f** = frekans (Hz)

### Pratik kısayol (amatör radyo)

Dalga boyu (metre) = **300 / frekans (MHz)**

| Frekans | Dalga boyu | Bant adı |
| --- | --- | --- |
| 3.5 MHz | 86 m | **80 metre** |
| 7 MHz | 43 m | **40 metre** |
| 14 MHz | 21 m | **20 metre** |
| 21 MHz | 14 m | **15 metre** |
| 28 MHz | 11 m | **10 metre** |
| 50 MHz | 6 m | **6 metre** |
| 145 MHz | 2 m | **2 metre** |
| 432 MHz | 0.7 m | **70 santimetre** |

"Bant adı" = dalga boyundan gelir. "20 metre bandı" = ~14 MHz frekans, dalga boyu ~21 m.

### Anten boyu neden dalga boyuyla ilgili?

Anten, dalga boyunun bir fraksiyonunda en verimli çalışır:

-   **Yarım dalga dipole** = λ/2 (20m bandında ~10m anten)
-   **Çeyrek dalga vertical** = λ/4 (2m bandında ~50cm anten)
-   [Anten boy hesaplayıcı →](/araclar/anten-hesaplayici/)

## Elektromanyetik spektrum

Radyo dalgaları, elektromanyetik spektrumun **düşük frekanslı** kısmı:

```
Radyo ← Mikro dalga ← Kızılötesi ← Görünür ışık ← UV ← X-ray ← Gamma
3 kHz                                                              10^20 Hz
```

Hepsi aynı fizik (Maxwell denklemleri), sadece frekans/dalga boyu farklı. Radyo = en uzun dalga (km'lerden mm'lere), gamma = en kısa (atom altı).

## Frekans birimleri

| Birim | Kısaltma | Değer |
| --- | --- | --- |
| Hertz | Hz | 1 döngü/saniye |
| Kilohertz | kHz | 1.000 Hz |
| Megahertz | MHz | 1.000.000 Hz |
| Gigahertz | GHz | 1.000.000.000 Hz |

**14.230 MHz** = saniyede 14 milyon 230 bin dalga. Bu dalgalar ışık hızında gider. Mandalına bastığında sinyalin dünyanın etrafını **saniyenin onda birinden kısa sürede** dönebilir.

## Amatör radyo frekans bantları

ITU tarafından amatörlere tahsis edilen bant aralıkları:

### HF (3-30 MHz) — "kısa dalga"

-   İyonosfer yansıması → dünya çapında menzil
-   En popüler DX bantları: 20m (14 MHz), 40m (7 MHz)
-   [HF propagasyon →](/tutorials/hf-propagasyon-temelleri)

### VHF (30-300 MHz)

-   Görüş hattı (line-of-sight) + röle iletişimi
-   2m bandı (145 MHz): Türkiye'de en aktif röle bandı
-   Sporadic E ile nadiren DX

### UHF (300 MHz - 3 GHz)

-   Daha kısa menzil, bina içi penetrasyon iyi
-   70cm bandı (432 MHz): DMR, D-STAR, repeater

### SHF / Mikrodalga (3-30 GHz)

-   Uydu, EME, deney
-   QO-100 geosynkron uydu (10 GHz downlink)

## Polarizasyon

Radyo dalgası bir **elektrik alanı** (E) + **manyetik alanı** (H) taşır. E alanının yönü = polarizasyon:

-   **Yatay**: dipole yere paralel
-   **Dikey**: vertical anten yere dik
-   **Dairesel**: uydu haberleşme (RHCP)
-   [Polarizasyon detay →](/tutorials/anten-polarizasyonu-detay)

## Modülasyon

Ham dalga (carrier) bilgi taşımaz. Bilgiyi (ses, veri) dalgaya bindirmek = **modülasyon**:

-   **AM**: genlik değişimi
-   **FM**: frekans değişimi
-   **SSB**: tek yan bant
-   **CW**: on/off (mors)
-   [Modülasyon detay →](/tutorials/modulasyon-am-fm-ssb-detay)

## Yayılım (propagasyon)

Radyo dalgası antenden çıktıktan sonra nereye gider?

-   **Yer dalgası**: yer yüzeyinde, 30-50 km menzil
-   **Gök dalgası**: iyonosferden yansıma, 2000-20.000 km
-   **Doğrudan**: görüş hattı (VHF/UHF röleler)
-   **Troposfer**: sıcaklık inversiyonu → VHF DX
-   **Meteor izleri**: VHF yansıma
-   [Propagasyon detay →](/tutorials/hf-propagasyon-temelleri), [İyonosfer →](/tutorials/ionosfer-katmanlari-detay)

## Desibel (dB) — sinyal ölçüsü

Radyo sinyalleri logaritmik ölçülür:

-   +3 dB = 2 katı güç
-   +10 dB = 10 katı güç
-   \-3 dB = yarı güç
-   [dB detay →](/tutorials/db-dbi-dbd-anten-kazanci)

## Pratik: formülü kullan

### Soru: 145 MHz'de anten boyu?

$\\lambda = 300 / 145 = 2.07 \\text{ metre}$ Yarım dalga dipole = 2.07 / 2 ≈ **1.03 m** Çeyrek dalga vertical = 2.07 / 4 ≈ **52 cm**

### Soru: 40m bandında frekans?

40 metre dalga boyu → f = 300 / 40 = **7.5 MHz** (bant merkezi ~7.1 MHz)

### Soru: 14.060 MHz'de dalga boyu?

λ = 300 / 14.060 = **21.3 metre** (20m bandı CW)

## Sık sorulan sorular

### Radyo dalgaları zararlı mı?

Yüksek güçte ve yakın mesafede termal etki var. Amatör güç seviyelerinde (5-100W) normal mesafede güvenli. [RF güvenliği →](/tutorials/rf-guvenligi-ve-saglik)

### Işık da radyo dalgası mı?

Aynı fizik (Maxwell), farklı frekans. Görünür ışık ~400-800 THz, radyo 3 kHz - 300 GHz.

### "Dalga boyu" neden önemli?

Anten boyutu dalga boyuyla orantılı. 80m bandı için 40m dipole gerek — bu pratik kısıtlama hangi bandı kullanacağını belirler.

### Sınav sorusu: λ = c/f nerede geçer?

KEGM sınavında **en az 2-3 soru** bu formülden çıkar. Ezberle, pratik yap.

* * *

## İlgili kaynaklar

-   [Anten boy hesaplayıcı](/araclar/anten-hesaplayici/)
-   [Modülasyon AM/FM/SSB](/tutorials/modulasyon-am-fm-ssb-detay)
-   [HF propagasyon temelleri](/tutorials/hf-propagasyon-temelleri)
-   [İyonosfer katmanları](/tutorials/ionosfer-katmanlari-detay)
-   [dB/dBi/dBd kazanç](/tutorials/db-dbi-dbd-anten-kazanci)
-   [Lisans sınavı simülatörü](/araclar/lisans-sinavi/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — radyo dalgası makaleleri
