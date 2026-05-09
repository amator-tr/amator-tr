---
title: Yapay Zeka ve Amatör Radyo — AI Destekli Operasyon Geleceği
description: >-
  AI / makine öğrenmesi amatör radyoda — weak signal decode, propagasyon tahmin,
  otomatik QSO, ChatGPT ham radyo asistanı, derin öğrenme + RF.
keywords:
  - yapay zeka
  - AI
  - machine learning
  - gelecek
  - dijital
article_section: yapay zeka
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: ChatGPT ile sınav geçilir mi?
    a: >-
      Tek başına hayır — sınav hayatta gerçek bilgi gerek. ChatGPT öğrenmek için
      yararlı tool ama sınav cevap kopyalama değil.
  - q: AI bot ile kontak yapanlar var mı?
    a: Az — etik gri alan + community kınıyor. Gerçek operatör tercih edilir.
  - q: En faydalı AI ham radyo aracı?
    a: >-
      - ChatGPT casual learning - WSPR + AI propagation (gelecek) -
      Speech-to-text logging (development)
  - q: LLM hallucination risk?
    a: >-
      Yüksek — ChatGPT yanlış teknik bilgi verebilir. Daima cross-reference
      (ARRL Handbook, ham radio reference).
  - q: AI codec2 broadcast yasası?
    a: 'Patentsiz, açık kaynak — kullanım serbest. Ham radyo''da yaygınlaştı. ---'
---
ChatGPT 2022'den beri her şeye AI girdi. Amatör radyoda da var. Bu rehber **AI'ın amatör radyo'ya nasıl entegre olduğu** + faydalı kullanım + tartışma.

## AI'ın amatör radyo'da yeri

### Tarih

-   **1960'lar**: ilk dijital signal processing (DSP) — pre-AI
-   **1990'lar**: WSJT (Joe Taylor) statistical decoding — proto-AI
-   **2010+**: deep learning patlama
-   **2020+**: ChatGPT, codec2 LPCNet, AI-powered SDR
-   **2026**: AI-assisted ham radio mainstream

### Şu anda kullanılan AI alanları

1.  Weak signal decode (FT8 sonrası)
2.  Codec ses (FreeDV LPCNet)
3.  Propagasyon tahmin
4.  Image enhancement (SSTV)
5.  Speech-to-text logging
6.  ChatGPT amatör asistan

## Weak signal decoding

### Klasik DSP

-   Filter + correlator + matched filter
-   WSJT FT8 -25 dB SNR decode

### AI-enhanced

-   Convolutional neural network (CNN) FT8 frame'i kategorize
-   5-10 dB iyileştirme tipik
-   "Imposible" sinyaller now decoded

### Pratik

-   WSJT-X 2.6+ AI plugins (community fork)
-   Researcher community (HamSCI)
-   Şu an deneysel, mainstream yakın

## Propagasyon tahmin

### Klasik

-   VOACAP HF prediction (1980'lerden beri)
-   F2 katmanı modeli + sunspot

### AI

-   ML model: WSPR data + SFI + K-index → MUF tahmin
-   Gerçek zamanlı network eğitilen
-   24-48 saat ileri tahmin doğruluğu klasikten %20 iyi

### Tools

-   **Multipsk** AI propagation analyzer
-   **DXSummit AI** (deneysel) — DX cluster spotting prediction

## ChatGPT amatör radyo asistan

### Pratik kullanım

-   "**Amatör radyo sınavıma hazırlanıyorum**, NVIS nedir?" → ChatGPT detaylı açıklar
-   "**14.080 MHz USB tune ediyorum, hangi mod?**" → "RTTY ortalama"
-   "Q kodu KQR ne demek?" → "Yanlış, KQR Q kodu yok"
-   "**Magnetic loop yapacağım, çap?**" → mathematical guidance

### Sınırlamalar

-   Yanlış bilgi (hallucination) verebilir
-   Spesifik son hare (TRAC events vs) bilmez
-   Radyo kontağı yapamaz (only conversation)

### En iyi uygulama

ChatGPT = **kütüphane + öğretmen**, gerçek operatör mentor değil. Ham radio decisions için lisanslı amatör + technical reference (ARRL Handbook) tercih.

## Codec2 + LPCNet (AI codec)

[FreeDV tutorialımız](/tutorials/freedv-dijital-ses-modu) Codec2'yi işliyor. AI evolution:

-   **Codec2 1300/700 bps** classical
-   **LPCNet** (AI-enhanced) → daha kaliteli ses, aynı bit rate
-   David Rowe (VK5DGR) + Mozilla collaboration

### Pratik

-   FreeDV 2020 modu LPCNet kullanır
-   HiFi ses 2400 bps ile (DMR'den iyi codec quality)
-   Open source

## SSTV image enhancement

### Klasik

-   Yavaş tarama → low res image (320×256)
-   Noise / fading sırasında pixel kayıp

### AI

-   **Super-resolution** ML model — düşük çözünürlüklü görüntü → yüksek çözünürlük
-   Pixel restoration (kayıp piksel doldurma)
-   Pratik: SSTV alıcısı bilgisayarda AI processing
-   Kullanım: ARISS ISS SSTV görüntü iyileştirme

## Speech-to-text + Auto Logging

### Geleneksel

-   Operatör elle log yazar
-   N1MM Logger keyboard input
-   Hız sınırı: yazma hızı

### AI

-   **Speech recognition** kontak ses kayıt → text
-   Otomatik **callsign extraction**
-   "59 hi name kaan qth bursa" → form fields fill
-   Logging hızı 5x

### Tools

-   **HamSCI Voice Decoder** research
-   N1MM third-party plug-in (WIP)

## DX prediction + spot AI

### Şu anki

-   DX cluster spotting manuel (operatörler rapor)
-   Yavaş, partial coverage

### AI

-   Reverse Beacon Network + AI propagation model
-   "Bu saatte 17m bantta DX yapılırsa Avustralya görüneceği"
-   Predictive spotting

## SDR + Deep Learning

### Software-defined radio + AI

-   SDR ham antene direkt sinyal alır
-   AI model spectrum waterfall'da signal classify et
    -   Bu AM mı? FM? FT8?
    -   Burada CW kontak var
    -   Şuradan radyo amatör sesi geçiyor

### GNU Radio + Tensorflow

-   Akademik araştırma
-   Real-time AI signal classification
-   Cognitive radio (AI seçici frekans / mod)

## AI in DXing

### "Pile-up management"

-   DX operatör 30 kişi pile-up'da
-   AI ses analiz: "TA1XYZ duyuldu", "TA2ABC duyuldu"
-   Auto-prioritize: ilk gelen, en güçlü, henüz log alınmamış
-   Operatöre öneri "şimdi TA2ABC'ye cevap ver"

### Kontes optimizasyonu

-   AI "şu anda bu bant + bu mod en hızlı QSO/saat"
-   Real-time strategy advice

## Tartışma: AI ham radio'yu öldürür mü?

### Korku

-   "AI kontak yapacaksa ben ne yaparım?"
-   "Hobby insan-insan bağlantısı, AI ile bozulur"
-   "Skill devalue olacak"

### Karşı argüman

-   **Tool olarak** kullanılır — chess + computer assistance gibi
-   İnsan operasyonu hâlâ keyifli, AI sadece destek
-   Yeni operatörler için bariyer azalır (hobi büyür)
-   Pratik DX hâlâ tatmin edici

### Realistik

AI %100 otomatik kontak imkansız ama **assist** rolü büyüyor:

-   Auto FT8 bot (yeni başlayan için)
-   AI propagation advisor
-   Voice-to-text logging

İnsan **takdir + manuel kontrol** her zaman önemli.

## Türkiye'de AI ham radio

### Şu anda

-   ChatGPT casual kullanım yaygın (sınava hazırlık)
-   Açık kaynak AI modelleri community usage
-   Akademik araştırma (Boğaziçi, ODTÜ AI lab)

### Gelecek

-   Türkçe ham radio chatbot (TRAC iş birliği fırsat)
-   AI propagation tool Türkiye'ye optimize
-   AI-assisted sınav hazırlık (lisans-sinavi/'da gelecek)

## Etik / yasal

### Encryption

AI signals decode etse bile **encryption olmamalı** (yönetmelik). Codec2 + LPCNet açık standart, sorun yok.

### Yetkisiz operasyon

-   AI bot kontak yaparsa **lisanslı operatör sorumlu**
-   Tam autonomous AI radyo yasal olmayan (operatör shall be in control)

### Privacy

-   Speech-to-text logging karşı tarafın izni gerek mi?
-   Kayıt etik tartışması

### Türkiye yönetmeliği

2026 itibariyle BTK AI-spesifik kural yok. Genel "lisanslı operatör kontrol" şart.

## Sık sorulan sorular

### ChatGPT ile sınav geçilir mi?

**Tek başına hayır** — sınav hayatta gerçek bilgi gerek. ChatGPT öğrenmek için yararlı tool ama sınav cevap kopyalama değil.

### AI bot ile kontak yapanlar var mı?

Az — etik gri alan + community kınıyor. Gerçek operatör tercih edilir.

### En faydalı AI ham radyo aracı?

-   ChatGPT casual learning
-   WSPR + AI propagation (gelecek)
-   Speech-to-text logging (development)

### LLM hallucination risk?

Yüksek — ChatGPT yanlış teknik bilgi verebilir. **Daima cross-reference** (ARRL Handbook, ham radio reference).

### AI codec2 broadcast yasası?

Patentsiz, açık kaynak — kullanım serbest. Ham radyo'da yaygınlaştı.

* * *

## İlgili kaynaklar

-   [SDR yazılım tabanlı telsiz](/tutorials/sdr-yazilim-tabanli-telsiz)
-   [FT8 dijital mod](/tutorials/ft8-dijital-mod)
-   [FT4 hızlı dijital mod](/tutorials/ft4-hizli-dijital-mod)
-   [WSPR](/tutorials/wspr-zayif-sinyal-yayini)
-   [FreeDV dijital ses](/tutorials/freedv-dijital-ses-modu)
-   [CubeSat amatör uzay gelecek](/tutorials/cubesat-amator-uzay-gelecek)
-   [Lisans sınavı simülatörü](/araclar/lisans-sinavi/)
-   HamSCI: [hamsci.org](https://hamsci.org/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/)
