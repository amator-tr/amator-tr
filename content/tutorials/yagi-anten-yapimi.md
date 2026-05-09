---
title: Yagi Anten Yapımı — DK7ZB Tasarımı 2m / 70cm DIY
description: >-
  VHF/UHF amatör için yönlü Yagi-Uda anten — DK7ZB klasik tasarımları, element +
  boom hesaplamaları, alüminyum boru ile DIY, kazanç ve F/B oranı.
keywords:
  - anten
  - yagi
  - vhf
  - uhf
  - dk7zb
  - diy
  - yönlü
article_section: anten
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: 'SWR > 3:1 her bantta'
    a: Driven element gap doğru değil; boom'la element direkt temas
  - q: F/B oranı düşük (yayın geriye sızıyor)
    a: Reflector çok kısa → uzat 5-10 mm
  - q: Sadece dar bantta çalışıyor
    a: >-
      Yagi karakteri — multiband istemiyorsan tek bant Yagi yap; multiband için
      "logperiodic"
  - q: Tabloyu uyguladım ama SWR kötü
    a: Element çapı tabloyla uyumsuz — DK7ZB sayfasında çap-spesifik tablolar var
  - q: Rüzgârda kırılıyor
    a: Element çapı 8-10 mm'e çıkar; boom 30 mm
---
## Yagi anten neden farklı?

Daha önce kapsadığımız [J-Pole / Slim Jim](/tutorials/anten-yapimi-temel) ve [HF dipole/EFHW](/tutorials/hf-dipole-efhw-anten) **omnidirectional** (her yöne eşit yayan) antenlerdir — kazanç ~2 dBi (dipole referansı). Yagi ise **yönlü**: enerjiyi belirli bir yöne odaklayıp **6-15 dBi kazanç** elde eder.

Pratik fark:

-   5W omnidirectional anten = ~5W EIRP
-   5W + **10 dBi yagi** = **50W EIRP** (10× güç boost!)
-   Aynı zamanda **alıcı** olarak da yönlü → arka plandan gelen parazit -15 dB azalır

Yagi'nin uydusu: 1926'da Hidetsugu Yagi + Shintaro Uda (Japon) tarafından geliştirilen, **driven element + reflector + N director** dizisi. TV antenleri, radar, DX kontestler hepsi Yagi'ye dayanır.

## Yapı

```
Yön ──→
              | director 3
              | director 2
              | director 1
              | driven element (besleme)
              | reflector
              boom (uzunlamasına alüminyum boru)
```

-   **Reflector** (arkadaki, en uzun) — sinyali ileri yansıtır
-   **Driven element** — koaksla beslenen tek aktif element (yarım dalga dipole)
-   **Director'lar** (önündekiler, kademeli kısalan) — sinyali daraltır, kazancı artırır

Element sayısı arttıkça:

-   3 element: ~7 dBi
-   5 element: ~9 dBi
-   7 element: ~11 dBi
-   10+ element: 13+ dBi (boom uzunluğu kritik)

## DK7ZB tasarımları (en popüler standart)

Martin Steyer (DK7ZB) tarafından bilgisayar-optimize edilmiş Yagi tasarımları, amatör topluluğun **fiili standardı**. Çıplak alüminyum boru + 50Ω koaks ile basit, **balun gerek değil** (28-Ohm-direct match veya 12.5-Ohm-2-coaxial-segment match patentleri).

### Tipik DK7ZB 2m tasarımları (144-148 MHz)

| Element sayısı | Boom uzunluğu | Kazanç | F/B oranı | Kullanım |
| --- | --- | --- | --- | --- |
| 3 element | 0.6 m | 7.0 dBd | 14 dB | Mobil, portatif |
| 4 element | 1.2 m | 8.0 dBd | 18 dB | Genel |
| **5 element** | **1.7 m** | **8.7 dBd** | 20 dB | **En popüler ev kullanımı** |
| 6 element | 2.4 m | 9.5 dBd | 22 dB | Ev + kontest |
| **7 element** | **3.3 m** | **11.0 dBd** | 25 dB | DX + kontest |
| 9 element | 5.0 m | 12.5 dBd | 28 dB | Profesyonel |

(dBd = dipole'a göre kazanç; +2.15 = dBi)

[DK7ZB resmi sitesi](https://www.qsl.net/dk7zb/) — tüm tasarımların PDF planları, element ölçüleri, boom kelepçe detayları.

## Malzeme listesi (5-element 2m DK7ZB)

| Parça | Adet | Açıklama | Yaklaşık fiyat (TR) |
| --- | --- | --- | --- |
| 6 mm alüminyum boru | 4 m | Element için (5 adet × 80 cm tahsisat) | 250 TL |
| 20 mm alüminyum boru | 2 m | Boom (1.7 m + fazlalık) | 200 TL |
| Plastik boom kelepçesi | 5 | Element-boom izolasyonu (PVC, naylon) | 50 TL |
| 50Ω koaks (RG-58 veya RG-213) | 5-15 m | RG-213 daha az kayıp | 60-150 TL |
| BNC veya PL-259 konektör | 1 | RG kablo ucu | 50 TL |
| 4:1 balun veya direct-match (DK7ZB) | — | Direct-match için choke yeter | 50-150 TL |
| Boom kelepçeli direk bağlantı | 1 | Mast'a U-bolt | 100 TL |
| Alüminyum levha + cıvata | — | Driven element bağlantısı | 50 TL |

**Toplam**: 800-1500 TL (matkap, kesici aletler hariç).

## DK7ZB 5-element 2m boyutları

```
Element  Uzunluk  Boom üzerinde pozisyon
                  (reflector = 0 mm)
─────────────────────────────────────────
Reflector   1010 mm    0 mm
Driven       960 mm   245 mm
Director 1   910 mm   400 mm
Director 2   895 mm   790 mm
Director 3   875 mm  1300 mm

Boom uzunluğu: 1700 mm
Element çapı: 6 mm (4-8 mm aralığı OK)
Driven element gap (besleme): 14 mm açıklık
```

(Detaylı PDF: [DK7ZB 5-el 2m](https://www.qsl.net/dk7zb/2m-Yagis/2m5el.htm))

### Driven element + matching

DK7ZB'nin patent yaklaşımı: **28-Ohm direct match**:

-   Driven element 28Ω empedans gösterir (normal dipole 73Ω, optimize değildir)
-   75Ω koaks'tan **half-wave matching section** (örn. RG-11) → 50Ω çıkış
-   Veya **çift 75Ω paralel** = 37.5Ω (yaklaşık)

Alternatif: standart dipole driven + **4:1 balun** (200Ω → 50Ω). Daha basit ama küçük performans kaybı.

Çoğu yeni başlayan için: **dipole driven + 4:1 balun + RF choke** kombo en güvenli.

## Yapım adımları (5-element 2m örneği)

### Adım 1: Boom hazırlığı

1.  20 mm alüminyum boruyu 1700 mm + 200 mm (mount fazlası) = 1900 mm kes
2.  Boom üzerine **5 nokta** işaretle (tablodan):
    -   0 mm (reflector)
    -   245 mm (driven)
    -   400 mm (director 1)
    -   790 mm (director 2)
    -   1300 mm (director 3)
3.  Her noktada 6 mm çapında **dik delik** aç (matkap + kıskaç ile dik)

### Adım 2: Element hazırlığı

Her element için 6 mm alüminyum boruyu tabloya göre kes (her birini ortadan dik delip boom'a sokulacak şekilde):

-   1010, 960, 910, 895, 875 mm

**Driven element farklı**: ortadan **14 mm gap** ile **iki yarım** halinde olmalı (besleme noktası):

-   Sol yarı: 480 mm
-   14 mm gap
-   Sağ yarı: 480 mm
-   Toplam: 974 mm (gap dahil 960 + 14 ≈ 974 — driven için + 14 mm fazla bırak)

### Adım 3: Element-boom izolasyonu

PVC kelepçe ile element'i boom'a izole et (alüminyum-alüminyum direct kontakt RF'de empedans bozar):

```
boom ════════════════════════════
      │  ↕ PVC kelepçe (sıkı)
      │
      element ─────  ─────
                gap 14 mm
                (driven only)
```

**Reflector + 3 director**: tek parça, ortadan dik geçer boom'dan. **Driven**: iki yarım, gap ortada, koaks merkezi sol yarıya, dış zırh sağ yarıya.

### Adım 4: Koaks bağlantısı + matching

Driven element gap arasına:

-   Koaks **merkez iletkeni** → bir yarım element
-   Koaks **dış zırh** → diğer yarım element

4:1 balun kullanıyorsan: balun → driven (200Ω input → koaks 50Ω output). Direct match (DK7ZB): 75Ω matching section + RF choke (5-7 sarım koaks, 90 mm çap).

### Adım 5: Boom-direk montaj

U-bolt ile boom'u mast'a sabit bağla. Boom **dengeli** olmalı (driven'ın etrafında).

### Adım 6: Test + SWR ayar

[NanoVNA](/tutorials/nanovna-anten-olcumu) ile 144-148 MHz sweep:

-   Hedef: SWR < 1.5:1, dip 145.5 MHz civarı
-   Üst frekansta dip → driven elementi **2-5 mm kısalt**
-   Alt frekansta dip → **2-5 mm uzat**

Yagi'ler dipole'dan **daha hassas** — 5 mm fark 2 MHz frekans kaymasına denk gelir.

## 70cm (UHF, 432 MHz) Yagi

Aynı tasarım prensibi, ölçüler **3× daha küçük** (frekans 3× daha yüksek):

| Bant | 5-el boom | 5-el reflector |
| --- | --- | --- |
| 2m (145 MHz) | 1700 mm | 1010 mm |
| 70cm (432 MHz) | 567 mm | 337 mm |

DK7ZB sayfasında ayrı 70cm tasarımları var. Çoğu kontest amatörü **2m + 70cm dual-band Yagi** (tek boom üzerinde iki ayrı element seti) kullanır — interleaved design.

## Yagi vs omnidirectional karşılaştırma

| Senaryo | Best anten |
| --- | --- |
| Mobil (araç içi, hareketli) | **Omni** (her yöne sinyal — Yagi yön değiştirmek zor) |
| Sabit istasyon, **bilinen DX yönü** | **Yagi** (10× boost) |
| Kontest (tüm dünya tarama) | **Yagi + rotor** (motor ile döndürülür) |
| EME (Earth-Moon-Earth) | **Çok büyük Yagi** (16+ element) |
| QRP / portatif | **Hafif 3-el Yagi** (DK7ZB 3-el portable) |
| 6m sporadic E | **Yagi** (sezonsal DX yönüne çevirilebilir) |

## Anten boy hesaplayıcı entegrasyonu

> 🛠️ **Hesaplayıcı:** Yagi element ölçüleri DK7ZB tasarımına özgüdür (computer-optimized). [Anten Boy Hesaplayıcı](/araclar/anten-hesaplayici/) genel formül-tabanlı dipole/J-Pole/EFHW için doğru sonuç verir; **Yagi** için DK7ZB'nin PDF tablolarını kullanın.

## Rotor — Yagi'nin yön değiştirici

Sabit istasyonda Yagi'yi mobil-equivalent yapan ekipman: **anten rotorü** (motor + kontrol kutusu).

| Rotor | Kullanım | Fiyat |
| --- | --- | --- |
| **Yaesu G-450A** | 2m / 70cm hafif | $400 |
| **Yaesu G-1000DXC** | 2m + 6m + small HF | $700 |
| **Hy-Gain TX-65** | Heavy-duty HF | $900+ |
| **Pi-tabanlı DIY** | OpenSource Yagi rotor | $200 |

Rotor + Yagi = "**mast üzerinde 360° dönen yönlü anten**". Kontest'te +5 dB DX avantajı.

## Sık sorunlar

| Belirti | Sebep |
| --- | --- |
| SWR > 3:1 her bantta | Driven element gap doğru değil; boom'la element direkt temas |
| F/B oranı düşük (yayın geriye sızıyor) | Reflector çok kısa → uzat 5-10 mm |
| Sadece dar bantta çalışıyor | Yagi karakteri — multiband istemiyorsan tek bant Yagi yap; multiband için "logperiodic" |
| Tabloyu uyguladım ama SWR kötü | Element çapı tabloyla uyumsuz — DK7ZB sayfasında çap-spesifik tablolar var |
| Rüzgârda kırılıyor | Element çapı 8-10 mm'e çıkar; boom 30 mm |

## Yararlı kaynaklar

-   [DK7ZB resmi (Martin Steyer)](https://www.qsl.net/dk7zb/) — tüm tasarımların PDF'leri
-   [DK7ZB 5-el 2m PDF](https://www.qsl.net/dk7zb/2m-Yagis/2m5el.htm)
-   [DK7ZB 7-el 2m homebrew (PA3HCM)](https://www.pa3hcm.nl/?p=370)
-   [M0UKD 2m portable Yagi](https://m0ukd.com/homebrew/antennas/144mhz-2m-portable-yagi-vhf-beam-antenna/)
-   [DK7ZB 2m+70cm dual-band (G1YBB)](https://g1ybb.uk/dk7zb-dual-band-2m70cm-yagi/)
-   [DXZone — 2m Yagi designs](https://www.dxzone.com/catalog/Antennas/2M/)

## Sıradaki adımlar

-   [Anten Boy Hesaplayıcı](/araclar/anten-hesaplayici/) — Dipole/EFHW için boy hesabı
-   [J-Pole / Slim Jim VHF anten](/tutorials/anten-yapimi-temel) — omni alternatif
-   [NanoVNA ile Anten Ölçümü](/tutorials/nanovna-anten-olcumu) — Yagi SWR ayarı için kritik
-   [DXCC ve DX Hunting](/tutorials/dxcc-dx-hunting) — Yagi'nizin gerçek faydası burada görünür

73 ve **iyi DX!**
