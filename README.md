# Webtechnologies final team project

1. Návrh grafického dizajnu pomocou CSS len v externom súbore. Responzívny dizajn + prispôsobenie
stránky pre tlač pomocou CSS.
2. Trojúrovňové menu. Menu bude dynamicky generované na základe údajov, ktoré budú vložené v poli.
3. Zobrazenie aktuálneho dátumu s meninami v daný deň. Súčasťou bude obojsmerné zisťovanie
priradenia dátumu a mena, t.j. po zadaní dátumu sa vypíše, kto má v daný deň meniny a po zadaní
mena sa vypíše, kedy má takáto osoba meniny. Pri zadávaní dátumu je potrebné zisťovať aj to, či je
dátum zmysluplný. Pri zlom zadaní dátumu sa nápoveda správnej syntaxe realizuje pomocou
tooltipu, ktorý bude realizovaný cez DOM2. Predpokladá sa, ze dátum sa bude dať zadať v tvare
31.3., t.j. nielen v tvare 31.03. Zoznam mien bude dodaný vo vhodnom formáte. Pri zadávaní mena do
formuláru sa bude dať vyhľadať aj meno bez diakritiky, pričom na veľkosti písmen nebude záležať.
4. Vytvorenie pripomienkovača osobných úloh. Do pripomienkovača sa zadá úloha, ktorá sa vypíše
medzi ostatnými úlohami na web stránke. Po zakliknutí, že je úloha spravená, sa úloha prestane
zobrazovať.
5. Zobrazenie počítadla osobných prístupov na stránku.
6. Zobrazenie histórie prehliadania vo forme path-based breadcrumbs (5 posledných podstránok).
7. Zobrazenie mapy Slovenska s markermi ukazujúcimi na miesta, kde sa nachádzajú na stránke
spracované technické pamiatky. Rozmiestnenie markerov sa bude robiť na základe GPS súradníc
definovaných vo vytvorenom json súbore. Tento bod bude realizovaný v dvoch prevedeniach:
 mapa Slovenska bude zobrazená prostredníctvom vhodného obrázku, ktorý si nájdete na internete (uveďte aj
zdroj obrázku).
 zobrazenie mapy Slovenska bude realizované pomocou Google maps.
8. Zobrazenie časovej osi vzniku spracovaných technických pamiatok. Údaj o vzniku pamiatky čerpajte
z json súboru. Pri kliknutí na bod osi s pamiatkou sa zvýrazní bod na mape a naopak.
9. Každý člen tímu spracuje info o dvoch technických pamiatkach na Slovensku vrátane fotografie
vybraných pamiatok. Zobrazenie tejto podstránky naformátujte tak, aby zverejnené pamiatky boli
na monitore umiestnené po dvoch vedľa seba (v dvoch stĺpcoch), pričom ľavý a pravý stĺpec bude
mať vizuálne iné pozadie (farba, okraj, vzor). Dbajte na to, aby obidve pozadia boli ukončené na
rovnakej úrovni (automaticky podľa dĺžky textu v dlhšom z nich). Zobrazenie článkov na smartfóne
a pri tlači riešte pod sebou.
Každý člen súboru dodá info do spoločného json súboru pamiatky.json, ktorý vytvorte v
nasledovnom formáte
```
{"pamiatky":[
{"nazov":"X1", "rokVzniku":“Y1", "sirka":"Z1a", "dlzka":"Z1b"},
{"nazov":"X2", "rokVzniku":“Y2", "sirka":"Z2a", "dlzka":"Z2b"},
{"nazov":"X3", "rokVzniku":“Y3", "sirka":"Z3a", "dlzka":"Z3b"}
]}
```
10. Vypracovanie individuálnej úlohy každým členom tímu – riešenie týchto úloh bude graficky
zapracované do vytvorenej web stránky, inak budú strhnuté body.
– V rámci individuálnej úlohy je potrebné, aby každý člen tímu naprogramoval jednu hru, v rámci
ktorej bude použitá drag and drop technológia.
– Hry je potrebné vyberať zo zoznamu hier, ktoré sú zverejnené vo fóre Námety na hry. V
prípade, že chcete naprogramovať niečo vlastné, je to možné, ale hra musí byť predtým
odsúhlasená prednášajúcou vo fóre. Odsúhlasovať sa budú predovšetkým logické hry (nie
bojové) a odsúhlasovanie sa bude robiť len v pracovnom čase.
– V tíme sa nesmie opakovať naprogramovanie tej istej hry.
– Pri hraní hry treba zabezpečiť možnosť získavania bodov, pričom užívateľ bude o tomto počte
bodov informovaný. Zároveň bude informovaný o najvyššom počte bodov, ktoré v svojej histórii
hrania hry získal.
– Súčasťou web stránky musí byť návod na riešenie danej úlohy, ktorý bude obsahovať aj popis
vami zvoleného bodovania. 

##Dodatky

Súčasťou web stránky bude kontakt na všetkých autorov (môžu byť aj fotky ) a checklist,
ktoré úlohy zo zadania boli splnené a kto čo robil – menovite. Checklist bude vo forme
tabuľky, kde jednotlivé stĺpce budú zodpovedať osobám v projekte a riadky jednotlivým
úlohám z predchádzajúcej fólie. Ako posledný riadok tabuľky uveďte, kto robil grafický
návrh.

• Ak autor nebude vedieť zodpovedať na otázku, ako naprogramoval danú časť, považuje sa to
za nesplnené.

• Všetci členovia kolektívu musia poznať a vedieť vysvetliť zdroják celého projektu (okrem
individuálnych úloh).

• Pri obhajobe sa môže pýtať na čokolvek...