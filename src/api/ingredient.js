// SOURCE:https://www.foodstandards.gov.au/consumer/additives/additiveoverview/Pages/default.aspx

const ADDITIVES_TEXT = `–:Monk fruit extract or luo han guo extract
–:Potassium polyaspartate
–:Sodium hydrosulphite
100:Curcumin or turmeric
101:Riboflavin
101:Riboflavin-5′-phosphate sodium
102:Tartrazine
103:Alkanet or Alkannin
104:Quinoline yellow
110:Sunset yellow FCF
120:Cochineal or carmines or carminic acid
122:Azorubine or Carmoisine
123:Amaranth
124:Ponceau 4R
127:Erythrosine
129:Allura red AC
132:Indigotine
133:Brilliant Blue FCF
140:Chlorophyll
141:Chlorophyll-copper complex
141:Chlorophyllin copper complex, sodium and potassium salts
142:Green S
143:Fast green FCF
150a:Caramel I
150b:Caramel II
150c:Caramel III
150d:Caramel IV
151:Brilliant black BN or Brilliant Black PN
153:Carbon blacks or Vegetable carbon
155:Brown HT
160a:Carotene
160b:Annatto extracts
160c:Paprika oleoresins
160d:Lycopene
160e:b-apo-8′-Carotenal
160f:b-apo-8′-Carotenoic acid methyl or ethyl ester
161a:Flavoxanthin
161b:Lutein
161c:Kryptoxanthin
161d:Rubixanthin
161e:Violoxanthin
161f:Rhodoxanthin
162:Beet red
163:Anthocyanins or Grape skin extract or Blackcurrant extract
164:Saffron or crocetin or crocin
170:Calcium carbonate
171:Titanium dioxide
172:Iron oxide
173:Aluminium
174:Silver
175:Gold
181:Tannic acid or tannins
200:Sorbic acid
201:Sodium sorbate
202:Potassium sorbate
203:Calcium sorbate
210:Benzoic acid
211:Sodium benzoate
212:Potassium benzoate
213:Calcium benzoate
216:Propylparaben or Propyl-p-hydroxy-benzoate
218:Methylparaben or Methyl-p-hydroxy-benzoate
220:Sulphur dioxide
221:Sodium sulphite
222:Sodium bisulphite
223:Sodium metabisulphite
224:Potassium metabisulphite
225:Potassium sulphite
228:Potassium bisulphite
234:Nisin
235:Natamycin or pimaricin
243:Ethyl lauroyl arginate
249:Potassium nitrite
250:Sodium nitrite
251:Sodium nitrate
252:Potassium nitrate
260:Acetic acid, glacial
261:Potassium acetate or Potassium diacetate
262:Sodium acetate
262:Sodium diacetate
263:Calcium acetate
264:Ammonium acetate
270:Lactic acid
280:Propionic acid
281:Sodium propionate
282:Calcium propionate
283:Potassium propionate
290:Carbon dioxide
296:Malic acid
297:Fumaric acid
300:Ascorbic acid
301:Sodium ascorbate
302:Calcium ascorbate
303:Potassium ascorbate
304:Ascorbyl palmitate
307b Tocopherols concentrate, mixed
307:α-Tocopherol
308:δ-Tocopherol
309:γ-Tocopherol
310:Propyl gallate
311:Octyl gallate
312:Dodecyl gallate
315:Erythorbic acid
316:Sodium erythorbate
319:tert-Butylhydroquinone
320:Butylated hydroxyanisole
321:Butylated hydroxytoluene
322:Lecithin
325:Sodium lactate
326:Potassium lactate
327:Calcium lactate
328:Ammonium lactate
329:Magnesium lactate
330:Citric acid
331:Sodium citrate
331:Sodium dihydrogen citrate
332:Potassium citrate
332:Potassium dihydrogen citrate
333:Calcium citrate
334:Tartaric acid
335:Sodium tartrate
336:Potassium tartrate or Potassium acid tartrate
337:Potassium sodium tartrate
338:Phosphoric acid
339:Sodium phosphate, dibasic
339:Sodium phosphate, monobasic
339:Sodium phosphate, tribasic
340:Potassium phosphate, dibasic
340:Potassium phosphate, monobasic
340:Potassium phosphate, tribasic
341:Calcium phosphate, dibasic or calcium hydrogen phosphate
341:Calcium phosphate, monobasic or calcium dihydrogen phosphate
341:Calcium phosphate, tribasic
342:Ammonium phosphate, dibasic
342:Ammonium phosphate, monobasic or Ammonium dihydrogen phosphates
343:Magnesium phosphate, dibasic
343:Magnesium phosphate, monobasic
343:Magnesium phosphate, tribasic
349:Ammonium malate
350:Sodium hydrogen malate
350:Sodium malate
351:Potassium malate
352:Calcium malate
353:Metatartaric acid
354:Calcium tartrate
355:Adipic acid
357:Potassium adipate
359:Ammonium adipates
363:Succinic acid
365:Sodium fumarate
366:Potassium fumarate
367:Calcium fumarate
368:Ammonium fumarate
380:Ammonium citrate
380:Triammonium citrate
381:Ferric ammonium citrate
385:Calcium disodium ethylenediaminetetraacetate or calcium disodium EDTA
392:Rosemary extract
400:Alginic acid
401:Sodium alginate
402:Potassium alginate
403:Ammonium alginate
404:Calcium alginate
405:Propylene glycol alginate
406:Agar
407:Carrageenan
407a:Processed eucheuma seaweed
409:Arabinogalactan or larch gum
410:Locust bean gum or carob bean gum
412:Guar gum
413:Tragacanth gum
414:Acacia or gum arabic
415:Xanthan gum
416:Karaya gum
417:Tara gum
418:Gellan gum
420:Sorbitol or sorbitol syrup
421:Mannitol
422:Glycerin or glycerol
431:Polyoxyethylene (40) stearate
432:Polysorbate 20 or Polyoxyethylene (20) sorbitan monolaurate
433:Polysorbate 80 or Polyoxyethylene (20) sorbitan monooleate
435:Polysorbate 60 or Polyoxyethylene (20) sorbitan monostearate
436:Polysorbate 65 or Polyoxyethylene (20) sorbitan tristearate
440:Pectin
442:Ammonium salts of phosphatidic acid
444:Sucrose acetate isobutyrate
445:Glycerol esters of wood rosins
450:Potassium pyrophosphate
450:Sodium acid pyrophosphate
450:Sodium pyrophosphate
451:Potassium tripolyphosphate
451:Sodium tripolyphosphate
452:Potassium polymetaphosphate
452:Sodium metaphosphate, insoluble
452:Sodium polyphosphates, glassy
455:Yeast mannoproteins
460:Cellulose microcrystalline
460:Cellulose, powdered
461:Methyl cellulose
463:Hydroxypropyl cellulose
464:Hydroxypropyl methylcellulose
465:Methyl ethyl cellulose
466:Sodium carboxymethylcellulose
470:Fatty acid salts of aluminium, ammonia, calcium, magnesium, potassium and sodium
471:Mono- and di-glycerides of fatty acids
472a:Acetic and fatty acid esters of glycerol
472b:Lactic and fatty acid esters of glycerol
472c:Citric and fatty acid esters of glycerol
472e:Diacetyltartaric and fatty acid esters of glycerol
472f:Mixed tartaric, acetic and fatty acid esters of glycerol or tartaric, acetic and fatty acid esters of glycerol (mixed)
473:Sucrose esters of fatty acids
475:Polyglycerol esters of fatty acids
476:Polyglycerol esters of interesterified ricinoleic acid
477:Propylene glycol mono- and di-esters or Propylene glycol esters of fatty acids
480:Dioctyl sodium sulphosuccinate
481:Sodium lactylate
481:Sodium oleyl lactylate
481:Sodium stearoyl lactylate
482:Calcium lactylate
482:Calcium oleyl lactylate
482:Calcium stearoyl lactylate
491:Sorbitan monostearate
492:Sorbitan tristearate
500:Sodium bicarbonate
500:Sodium carbonate
501:Potassium bicarbonate
501:Potassium carbonate
503:Ammonium carbonate
503:Ammonium hydrogen carbonate
504:Magnesium carbonate
507:Hydrochloric acid
508:Potassium chloride
509:Calcium chloride
510:Ammonium chloride
511:Magnesium chloride
512:Stannous chloride
514:Sodium sulphate
515:Potassium sulphate
516:Calcium sulphate
518:Magnesium sulphate
519:Cupric sulphate
526:Calcium hydroxide
529:Calcium oxide
530:Magnesium oxide
535:Sodium ferrocyanide
536:Potassium ferrocyanide
541:Sodium aluminium phosphate
542:Bone phosphate
551:Silicon dioxide, amorphous
552:Calcium silicate
553:Magnesium silicate or Talc
554:Sodium aluminosilicate
555:Potassium aluminium silicate
556:Calcium aluminium silicate
558:Bentonite
559:Aluminium silicate
560:Potassium silicate
570:Stearic acid or fatty acid
575:Glucono δ-lactone or Glucono delta-lactone
576:Sodium gluconate
577:Potassium gluconate
578:Calcium gluconate
579:Ferrous gluconate
580:Magnesium gluconate
586:4-hexylresorcinol
620:L-glutamic acid
621:Monosodium L-glutamate or MSG
622:Monopotassium L-glutamate
623:Calcium glutamate
624:Monoammonium L-glutamate
625:Magnesium glutamate
627:Disodium-5′-guanylate
631:Disodium-5′-inosinate
635:Disodium-5′-ribonucleotides
636:Maltol
637:Ethyl maltol
640:Glycine
641:L-Leucine
900a:Polydimethylsiloxane or Dimethylpolysiloxane
901:Beeswax, white and yellow
903:Carnauba wax
904:Shellac
905b:Petrolatum or petroleum jelly
914:Oxidised polyethylene
920:L-cysteine monohydrochloride
941:Nitrogen
942:Nitrous oxide
943a:Butane
943b:Isobutane
944:Propane
946:Octafluorocyclobutane
950:Acesulphame potassium
951:Aspartame
952:Cyclamate or calcium cyclamate or sodium cyclamate
953:Isomalt
954:Saccharin
955:Sucralose
956:Alitame
957:Thaumatin
961:Neotame
960:Steviol glycosides
962:Aspartame-acesulphame salt
965:Maltitol and maltitol syrup or hydrogenated glucose syrup
966:Lactitol
967:Xylitol
968:Erythritol
969:Advantame
999(i):Quillaia extract (type 1)
999(ii):Quillaia extract (type 2)
1001:Choline salts
1100:α-Amylase
1101:Proteases (papain, bromelain, ficin)
1102:Glucose oxidase
1104:Lipases
1105:Lysozyme
1200:Polydextrose
1201:Polyvinylpyrrolidone
1400:Dextrin roasted starch
1401:Acid treated starch
1402:Alkaline treated starch
1403:Bleached starch
1404:Oxidised starch
1405:Enzyme treated starches
1410:Monostarch phosphate
1412:Distarch phosphate
1413:Phosphated distarch phosphate
1414:Acetylated distarch phosphate
1420:Starch acetate
1422:Acetylated distarch adipate
1440:Hydroxypropyl starch
1442:Hydroxypropyl distarch phosphate
1450:Starch sodium octenylsuccinate
1451:Acetylated oxidised starch
1505:Triethyl citrate
1518:Triacetin
1520:Propylene glycol
1521:Polyethylene glycol 8000
1522:Calcium lignosulphonate (40-65)
`

function parseAdditivesText() {
  const entries = ADDITIVES_TEXT.split(`\n`)
  const result = []
  console.debug(`bakeworks-core.src.api.ingredient.parseAdditivesText: entries.length=${entries.length}`)
  entries.forEach(e => {
    [code, label] = e.split(':')
    console.debug(`bakeworks-core.src.api.ingredient.parseAdditivesText: code=${code} label=${label}`)
    result.push([code, label])
  })
  return result
}

const ADDITIVES = parseAdditivesText()
