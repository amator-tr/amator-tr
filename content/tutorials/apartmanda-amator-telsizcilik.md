---
title: 'Apartmanda Amatör Telsizcilik — Anten, RFI ve Komşu Sorunları'
description: >-
  Apartman dairesinde amatör telsizcilik nasıl yapılır. Manyetik loop, balkon
  vertical, attic dipole, gizli antenler. RFI önleme, komşu şikayeti, yönetici
  izni.
keywords:
  - apartman
  - anten
  - magnetic loop
  - RFI
  - başlangıç
article_section: apartman
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Apartmandan FT8 ile DX yapılır mı?
    a: >-
      Evet, kesin. Magnetic loop + 25W ile Brezilya'ya, Japonya'ya,
      Avustralya'ya kontak rapor edenler var. Anten verimliliği düşük olsa bile
      FT8'in -25 dB SNR decode'u büyük güçü tolere eder.
  - q: Kira evi için anten önerisi?
    a: >-
      Stealth: ince tel EFHW + balkon parmaklığında gizli. Vertical da anlık
      takılıp sökülür.
  - q: Yönetim "anten yasak" derse?
    a: >-
      Yönetim kararı kat maliklerine bağlı. Yine de gizli (attic / stealth)
      antenler için izin gerekmez. Asla zorla göze sokmaya çalışma — ilişki
      bozulur.
  - q: En ucuz apartman setup'ı?
    a: >-
      - Baofeng UV-5R (~600 TL) + Nagoya NA-771 anten (~150 TL) = 750 TL toplam
      - Çatı/balkon antene ihtiyaç yok, içeriden bile röleye ulaşır ---
---
Şehirde apartman dairesinde amatör telsizci olmak — kulağa "imkansız" gelir ama 50+ yıldır operatörler buna çözüm üretiyor. Çatıya 6m Yagi koymak yok ama HF DX yapmak kesinlikle mümkün. Bu rehber 4 anten stratejisi + RFI / komşu sorunlarını yönetme.

## Apartman amatör operatöre 3 zorluk

1.  **Anten yer alanı** — çatı kullanılamaz, balkon dar
2.  **RFI** (Radio Frequency Interference) — komşunun TV/Wi-Fi/yapay kalp pili etkilenir mi?
3.  **Yönetim/komşu izni** — yönetmelik dış görünümde değişiklik yasak

İlk önce kabul edelim: çatıdan 6m Yagi kuran müstakil ev sahibi gibi DX yapamayacaksın. Ama VHF röle, HF SSB ve dijital modlarla tatmin edici operasyon **yapılabilir**.

## Anten stratejileri

### 1\. Manyetik Loop Antenler (En sessiz)

**Nedir:** 1 metre çapında bakır boru loop + ayar kondansatörü (variable cap). Manyetik alan dominant — elektrik alanı zayıf. Bu yüzden:

-   Komşu RFI çok az
-   Apartman içinde / balkonda çalışır
-   Yer alanı **1m × 1m**

**Avantajlar:**

-   HF (40m, 20m, 17m, 15m) bantlarda mucize
-   İçeride bile çalışır (oturma odası, çalışma odası)
-   Polarizasyonu döndürürsün — fading'e karşı esnek
-   DX yapanlardan duydum: 1m loop ile Avustralya'ya 5W FT8

**Dezavantajlar:**

-   **Dar bant** — her frekansta kondansatör ayarı gerek (motorlu remote tuner)
-   2m / 70cm için pratik değil (boyut sorunu)
-   Yapımı orta seviye — loop boru lehim, vacuum cap pahalı

**Hazır seçenekler:**

-   **MFJ-1786** (~$500) — 10-30 MHz
-   **Alpha Loop Magnetic** (~$700)
-   **Chameleon F-Loop** (~$500)

**DIY:**

-   8 mm bakır boru, ~3.2m uzunluk
-   100-300 pF vacuum variable capacitor
-   Coax: 1 sarım küçük loop (coupling)
-   Toplam ~5000 TL malzeme

[Telsizcilik.com'da magnetic loop makaleleri](https://telsizcilik.com/) detayları işliyor.

### 2\. Balkon Vertical (Apartman favorisi)

**Nedir:** Balkon korkuluğuna sabitlenmiş 2-3m vertical anten (HF) veya 1m (VHF/UHF).

**HF için:**

-   **Hustler 6BTV** veya benzer multi-band vertical
-   Balkon korkuluğu **counterpoise** (ground plane) görevi görür
-   80-10m arası çalışır

**VHF/UHF için:**

-   **Diamond X-30** (1.3m, dual band 2m/70cm) — gold standart
-   **Comet GP-3** (1.7m, dual band) — gain biraz daha
-   5m kablo ile balkona kelepçele

**Avantajlar:**

-   Görünür ama ufak (renk + kelepçe ile gizlenebilir)
-   Omnidireksiyonel — 360° tüm yönlere
-   VHF'te röleye yeterli (50 km menzil)

**Dezavantajlar:**

-   Estetik (yönetim itiraz edebilir)
-   **Lightning rod** — fırtınada cihaz kapat, koaks söküver
-   Yağmur/kar drift'e yol açabilir

### 3\. Attic / Çatı arası antenler (Gizli)

**Nedir:** Çatı arasına (kullanılmıyorsa) gerilen dipole / EFHW. Görünmez, yönetim haberi yok.

**Düşünmek gerekenler:**

-   Çatı kalıbı metal mu? (Beton/kiremit OK, metal panel sorunlu)
-   Yangın güvenliği — koaks geçişi düzgün
-   Kapı/havalandırma teli ile karışmasın

**Anten örnekleri:**

-   40m yarım dalga dipole — 20m uzun, çatı arası uzunsa OK
-   20m EFHW — 10m uzun, çoğu çatı arasına sığar
-   2m J-Pole — küçük, dik durabilir

**Avantajlar:**

-   Tamamen gizli
-   Hava şartlarına maruz değil — daha uzun ömür
-   Yönetim/komşu sorun yok

**Dezavantajlar:**

-   Metal çatı kuvvetle yansıtır → SWR sorun
-   Yapım için çatı erişimi gerek
-   Performans dış antene göre %30-50 düşük (yer altı kayıpları)

### 4\. Stealth Antenler (Görünmezlik şart)

**Saç teli antenler:**

-   0.5 mm bakır tel — gözle görünmez 5m'den
-   Koyu kahverengi PVC izolasyon → balkon parmaklığında saklı

**End-Fed Half-Wave (EFHW):**

-   49:1 unun ile tek tel besleme
-   Duvardan dışarı tek nokta, sonra ağaçtan ağaca veya parmaklıktan
-   20m HF için 10m tel, 40m için 20m

**Telescopic flag pole** (bayrak direği antenler):

-   Komşu "bayrak" zanneder, gerçekte içi vertical
-   5-10m boy, plastic dış, içi anten elementi

## Çatı erişimin varsa: sınıf atlama

Balkon sınırlarından kurtulup çatıya çıkmak bir radyo amatörü için **sınıf atlamak** gibi. Yükseklik avantajı + ev içi elektronik gürültüden (QRM) uzaklaşma. Çatıda iki ana senaryo:

### VHF/UHF için: Collinear dikey (ilk tercih)

Tek anten kurma şansın varsa bu olsun. Üst üste binmiş elemanlardan oluşan collinear (Diamond X-30/X-50, Comet GP-3) **360 derece kapsama** sağlar — her yöndeki röleyi duyarsın. Rüzgar yükü düşük, kurulumu tek boru + kelepçe. Dezavantajı yatay polarize SSB DX'te performans kaybı.

### VHF/UHF için: Sabit yönlü Yagi (uzak röle)

Belirli bir yöndeki çok uzak röleye veya şehre odaklanmak istiyorsan Yagi. 5 Watt basarken sanki 50 Watt etkisi yaratır — ama bakmadığı yöne sağır. Rotator motor gerektirir ki çatıda mekanik karmaşa demek.

### HF için: Çatıda EFHW

Çatının en büyük avantajı — telin bir ucu senin direkle, diğer ucu binanın uzak köşesindeki paratoner veya havalandırma borusuna bağlanır. Telin altı açık, komşular görmez. 40m + 20m + 15m + 10m dört bant tek tel.

### HF için: Çatıda Trap Dipole

İki yöne gerilen tel, ortadan beslenen, aralarında trap (tuzak devreleri) olan multi-band dipole. İnce tel yapısı komşuları tedirgin etmez. Paratoner + havalandırma boru uçlarına gizli bağlantı.

### Çatı kuralları

-   Ortak kullanım alanı → **yönetim bilgilendir** (izin gerek olmayabilir ama saygı göster)
-   Yıldırım koruma → anten yıldırım çeker, **lightning arrestor zorunlu** ([topraklama tutorial](/tutorials/rf-topraklama-yildirim-koruma))
-   Rüzgar direnci → kelepçe + gergi teli, anten devrilmesin

## VHF/UHF: röleler hayatını kurtarır

Apartmanda 5W el telsiziyle bile çatıdaki röleye ulaşabiliyorsan, lokal kontak için yeterli:

-   İstanbul Çamlıca rölesi 145.6125 (-0.6, CTCSS 88.5) — şehir merkezinin %90'ından erişilir
-   [Röle CSV listesi](/role-export/) — Türkiye'deki tüm röleler

Apartman + 5W + iyi anten + röle erişimi = **günlük QSO yeterli**.

## RFI (komşu girişimi) — kritik

Yapay zekanın anlamadığı insan kişiliği faktörü: **komşu** sızlanırsa lisansın iptale gider. Önlemler:

### TX gücünü düşür

-   100W'a gerek yok — 25-50W çoğu band için yeter
-   FT8 gibi modlar 5-10W ile dünya çapında çalışır

### Common-mode current (CMC) bastır

-   **1:1 current balun** anten besleme noktasına
-   **Coax choke** (ferrit toroidal) — koaksta birkaç sarım, RF'in kabloda dolaşmasını engeller
-   Mix-31 ferrit halka 5-10 sarım koaks → 90% CMC azaltır

### Filtreleme

-   **Low-pass filter** (LPF) HF vericiden çıkışa — 30 MHz üstü harmonikleri keser
-   **Band-pass filter** istenmeyen yan bantları bastırır
-   **Notch filter** spesifik frekansta (ör Wi-Fi 2.4 GHz) gürültü kesme

### Komşu cihazlarına ferrit

-   TV / monitör güç kablosuna **ferrit clip-on** — komşunun cihazında ucuz çözüm
-   Wi-Fi router'a ferrit
-   Bunları sen alıp komşuya hediye ederek "iyi komşu" puanı kazan

### Bant seçimi

-   80m / 40m gece — komşu uyuyor, az şikayet
-   2m / 70cm — düşük güç + yüksek frekans, ev içi cihazlara az girer

## Yasal durum — Türkiye

BTK yönetmeliği:

-   **Kira sözleşmesi**: ev sahibi anten reddedebilir, sözleşme öncesi yaz
-   **Yönetmelik dış görünüm**: kat malikleri kararıyla anten kaldırılabilir
-   **EMC standartları**: vericiniz CE damgalı olmalı
-   **RF maruziyeti**: Türkiye'de 100W üstünde EMF assessment gerek (genel olarak ulaşmazsın)

## Pratik strateji: ilk 3 ay

1.  **Hafta 1-2:** Baofeng UV-5R + Diamond X-30 balkon → röle kontağı, bedava
2.  **Ay 1:** RTL-SDR ile dinleme, propagasyon hissi kazanma
3.  **Ay 2:** Eğer DX hevesi varsa MFJ-1786 magnetic loop veya HF vertical → FT8 düşük güçle dünya
4.  **Ay 3:** Komşu/yönetim sorun yoksa attic dipole — kalıcı çözüm

## QRP felsefesi

Apartman = doğal QRP (düşük güç) eğitimi:

-   5W ile FT8 dünya çapında (DXCC'in %50'si yapılabilir)
-   10W SSB ile Avrupa kontağı
-   100W'a kıyasla **çok daha az komşu sorunu**

QRP topluluğu apartman amatörünü "çetin koşullarda kontak yapan ustalar" olarak görür. Düşük güç = daha çok zeka.

## Sık sorulan sorular

### Apartmandan FT8 ile DX yapılır mı?

Evet, kesin. Magnetic loop + 25W ile Brezilya'ya, Japonya'ya, Avustralya'ya kontak rapor edenler var. Anten verimliliği düşük olsa bile FT8'in -25 dB SNR decode'u büyük güçü tolere eder.

### Kira evi için anten önerisi?

Stealth: ince tel EFHW + balkon parmaklığında gizli. Vertical da anlık takılıp sökülür.

### Yönetim "anten yasak" derse?

Yönetim kararı kat maliklerine bağlı. Yine de gizli (attic / stealth) antenler için izin gerekmez. Asla zorla göze sokmaya çalışma — ilişki bozulur.

### En ucuz apartman setup'ı?

-   Baofeng UV-5R (~600 TL) + Nagoya NA-771 anten (~150 TL) = **750 TL toplam**
-   Çatı/balkon antene ihtiyaç yok, içeriden bile röleye ulaşır

* * *

## İlgili kaynaklar

-   [Anten yapımı temel](/tutorials/anten-yapimi-temel) — J-Pole, Slim Jim
-   [HF dipole + EFHW](/tutorials/hf-dipole-efhw-anten) — apartman dipolesi
-   [Röle nedir](/tutorials/role-nedir) — VHF röle pratiği
-   [SWR temel](/tutorials/swr-temel-bilgisi) — anten ölçümü
-   [Anten boy hesaplayıcı](/araclar/anten-hesaplayici/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — apartman çözümleri
