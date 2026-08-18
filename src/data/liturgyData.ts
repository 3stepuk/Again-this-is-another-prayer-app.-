import { OfficeData, HourType, LiturgicalSeason, MarianAntiphon } from '../types';

export const MARIAN_ANTIPHONS: Record<string, MarianAntiphon> = {
  salveRegina: {
    name: 'Salve Regina',
    season: 'Ordinary Time',
    antiphon: {
      en: 'Hail, Holy Queen, Mother of Mercy, hail, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.',
      la: 'Salve, Regina, Mater misericordiae, vita, dulcedo et spes nostra, salve. Ad te clamamus, exsules filii Hevae. Ad te suspiramus gementes et flentes in hac lacrimarum valle. Eia ergo, advocata nostra, illos tuos misericordes oculos ad nos converte. Et Iesum, benedictum fructum ventris tui, nobis post hoc exsilium ostende. O clemens, o pia, o dulcis Virgo Maria.',
    },
    versicle: {
      en: 'V. Pray for us, O holy Mother of God.',
      la: 'V. Ora pro nobis, sancta Dei Genetrix.',
    },
    response: {
      en: 'R. That we may be made worthy of the promises of Christ.',
      la: 'R. Ut digni efficiamur promissionibus Christi.',
    },
    prayer: {
      en: 'Almighty and everlasting God, who by the co-operation of the Holy Spirit didst prepare the body and soul of the glorious Virgin-Mother Mary to become a worthy dwelling-place for Thy Son: grant that as we rejoice in her commemoration, so by her loving intercession we may be delivered from present evils and from everlasting death. Through the same Christ our Lord. Amen.',
      la: 'Omnipotens sempiterne Deus, qui gloriosae Virginis Matris Mariae corpus et animam, ut dignum Filii tui habitaculum effici mereretur, Spiritu Sancto cooperante, praeparasti: da, ut, cuius commemoratione laetamur, eius pia intercessione ab instantibus malis et a morte perpetua liberemur. Per eundem Christum Dominum nostrum. Amen.',
    },
  },
  reginaCaeli: {
    name: 'Regina Caeli',
    season: 'Easter',
    antiphon: {
      en: 'Queen of Heaven, rejoice, alleluia. For He whom you were worthy to bear, alleluia. Has risen, as he said, alleluia. Pray for us to God, alleluia.',
      la: 'Regina caeli, laetare, alleluia. Quia quem meruisti portare, alleluia. Resurrexit, sicut dixit, alleluia. Ora pro nobis Deum, alleluia.',
    },
    versicle: {
      en: 'V. Rejoice and be glad, O Virgin Mary, alleluia.',
      la: 'V. Gaude et laetare, Virgo Maria, alleluia.',
    },
    response: {
      en: 'R. For the Lord is truly risen, alleluia.',
      la: 'R. Quia resurrexit Dominus vere, alleluia.',
    },
    prayer: {
      en: 'O God, who gave joy to the world through the resurrection of Thy Son, our Lord Jesus Christ, grant we beseech Thee, that through His Mother, the Virgin Mary, we may obtain the joys of everlasting life. Through the same Christ our Lord. Amen.',
      la: 'Deus, qui per resurrectionem Filii tui, Domini nostri Iesu Christi, mundum laetificare dignatus es: praesta, quaesumus; ut, per eius Genetricem Virginem Mariam, perpetuae capiamus gaudia vitae. Per eundem Christum Dominum nostrum. Amen.',
    },
  },
};

export const COMMON_GLORIA_PATRI = {
  en: 'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be forever. Amen.',
  la: 'Gloria Patri, et Filio, et Spiritui Sancto: Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen.',
};

export const COMMON_LORDS_PRAYER = {
  en: 'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
  la: 'Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum cotidianum da nobis hodie, et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen.',
};

// Generate complete liturgy content tailored to the selected office hour
export function getOfficeData(hour: HourType, season: LiturgicalSeason = 'Ordinary Time'): OfficeData {
  switch (hour) {
    case 'invitatory':
      return {
        hour: 'invitatory',
        title: 'Invitatory',
        latinTitle: 'Invitatorium',
        recommendedTime: 'Before the first office of the day (5:30 AM - 7:00 AM)',
        invitatoryAntiphon: {
          en: 'Come, let us worship the Lord, for he is our God.',
          la: 'Venite, adoremus Dominum, quia ipse est Deus noster.',
        },
        invitatoryPsalm: {
          id: 'psalm-95',
          title: 'Psalm 95',
          subtitle: 'A call to praise God',
          antiphon: {
            en: 'Come, let us worship the Lord, for he is our God.',
            la: 'Venite, adoremus Dominum, quia ipse est Deus noster.',
          },
          verses: [
            {
              en: 'Come, let us sing to the Lord; let us make a joyful noise to the rock of our salvation! Let us come into his presence with thanksgiving; let us make a joyful noise to him with songs of praise!',
              la: 'Venite, exsultemus Domino; iubilemus Deo salutari nostro. Praeoccupemus faciem eius in confessione, et in psalmis iubilemus ei.',
            },
            {
              en: 'For the Lord is a great God, and a great King above all gods. In his hand are the depths of the earth; the heights of the mountains are his also.',
              la: 'Quoniam Deus magnus Dominus, et Rex magnus super omnes deos. Quia in manu eius sunt omnes fines terrae, et altitudines montium ipsius sunt.',
            },
            {
              en: 'The sea is his, for he made it, and the dry land, which his hands have formed. Come, let us worship and bow down, let us kneel before the Lord, our Maker!',
              la: 'Quoniam ipsius est mare, et ipse fecit illud, et siccam manus eius formaverunt. Venite, adoremus, et procidamus: et ploremus ante Dominum, qui fecit nos.',
            },
            {
              en: 'For he is our God, and we are the people of his pasture, and the sheep of his hand. O that today you would listen to his voice! Do not harden your hearts.',
              la: 'Quia ipse est Dominus Deus noster, et nos populus pascuae eius, et oves manus eius. Hodie si vocem eius audieritis, nolite obdurare corda vestra.',
            },
          ],
          gloriaPatri: COMMON_GLORIA_PATRI,
        },
        hymn: {
          title: 'O Kind Creator, Bow Thine Ear',
          text: {
            en: 'O kind Creator, bow thine ear / To mark the cry, to spare the tear / Made manifest in this our fast / Of forty days, or daily task.\n\nSearcher of hearts, who dost discern / How frail we are, to thee we turn; / Grant us the pardon that we claim / And glorify thy holy Name.',
            la: 'Audi, benigne Conditor, / nostras preces cum fletibus / in hoc sacro ieiunio / fusas quadragenario.\n\nScrutator alme cordium, / infirma tu nosti virium, / ad te reversis exhibe / remissionis gratiam.',
          },
        },
        psalms: [],
        scripture: {
          citation: '1 Thessalonians 5:4-5',
          text: {
            en: 'You are not in darkness, brethren, for that day to surprise you like a thief. For you are all sons of light and sons of the day; we are not of the night or of darkness.',
            la: 'Vos autem, fratres, non estis in tenebris, ut dies ille vos tanquam fur comprehendat: omnes enim vos filii lucis estis, et filii diei.',
          },
        },
        lordsPrayer: COMMON_LORDS_PRAYER,
        concludingPrayer: {
          en: 'Lord God, king of heaven and earth, direct and sanctify, rule and govern our hearts and bodies, our thoughts, words and deeds, in your law and in the work of your commandments, that now and forever we may be saved and delivered by you, O Savior of the world, who live and reign forever and ever. Amen.',
          la: 'Dirigere et sanctificare, regere et gubernare dignare, Domine Deus, Rex caeli et terrae, hodie corda et corpora nostra, sensus, sermones et actus nostros in lege tua et in operibus mandatorum tuorum, ut hic et in aeternum, te auxilante, salvi et liberi esse mereamur, Salvator mundi. Qui vivis et regnas in saecula saeculorum. Amen.',
        },
      };

    case 'readings':
      return {
        hour: 'readings',
        title: 'Office of Readings',
        latinTitle: 'Officium Lectionis',
        recommendedTime: 'Early morning or flexible hour of contemplation',
        hymn: {
          title: 'The Day Is Nighted In Thy Light',
          text: {
            en: 'The eternal gifts of Christ the King, / The Apostles’ glory, let us sing; / And all with hearts of gladness raise / Due hymns of thankful love and praise.\n\nIn them the Church’s triumph shines, / The holy light of heavenly minds; / They conquered all the rage of earth, / And brought the spirit to rebirth.',
            la: 'Aeterna Christi munera, / Apostolorum gloriam, / palmas et hymnos debitos / laetis canamus mentibus.\n\nEcclesiarum principes, / belli triumphales duces, / caelestis aulae milites / et vera mundi lumina.',
          },
        },
        psalms: [
          {
            id: 'psalm-1',
            title: 'Psalm 1',
            subtitle: 'The two ways of human life',
            antiphon: {
              en: 'Blessed is the man who ponders the law of the Lord day and night.',
              la: 'Beatus vir, qui in lege Domini meditatur die ac nocte.',
            },
            verses: [
              {
                en: 'Blessed is the man who walks not in the counsel of the wicked, nor stands in the way of sinners, nor sits in the seat of scoffers; but his delight is in the law of the Lord, and on his law he meditates day and night.',
                la: 'Beatus vir, qui non abiit in consilio impiorum, et in via peccatorum non stetit, et in cathedra pestilentiae non sedit; sed in lege Domini voluntas eius, et in lege eius meditabitur die ac nocte.',
              },
              {
                en: 'He is like a tree planted by streams of water that yields its fruit in its season, and its leaf does not wither. In all that he does, he prospers.',
                la: 'Et erit tanquam lignum, quod plantatum est secus decursus aquarum, quod fructum suum dabit in tempore suo: et folium eius non defluet; et omnia quaecumque faciet, prosperabuntur.',
              },
              {
                en: 'The wicked are not so, but are like chaff that the wind drives away. For the Lord knows the way of the righteous, but the way of the wicked will perish.',
                la: 'Non sic impii, non sic; sed tanquam pulvis, quem proicit ventus a facie terrae. Quoniam novit Dominus viam iustorum, et iter impiorum peribit.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
          {
            id: 'psalm-2',
            title: 'Psalm 2',
            subtitle: 'The Messiah, King and Conqueror',
            antiphon: {
              en: 'I have set my King on Zion, my holy hill.',
              la: 'Ego autem constitui Regem meum super Sion, montem sanctum eius.',
            },
            verses: [
              {
                en: 'Why do the nations conspire, and the peoples plot in vain? The kings of the earth set themselves, and the rulers take counsel together, against the Lord and against his Anointed.',
                la: 'Quare fremuerunt gentes, et populi meditati sunt inania? Astiterunt reges terrae, et principes convenerunt in unum adversus Dominum, et adversus Christum eius.',
              },
              {
                en: 'He who sits in the heavens laughs; the Lord has them in derision. Then he will speak to them in his wrath, and terrify them in his fury, saying: "I have set my King on Zion, my holy hill."',
                la: 'Qui habitat in caelis irridebit eos, et Dominus subsannabit eos. Tunc loquetur ad eos in ira sua, et in furore suo conturbabit eos. Ego autem constitui Regem meum super Sion.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
          {
            id: 'psalm-3',
            title: 'Psalm 3',
            subtitle: 'Confidence in God in the midst of trouble',
            antiphon: {
              en: 'You, O Lord, are a shield about me, my glory, and the lifter of my head.',
              la: 'Tu autem, Domine, susceptor meus es, gloria mea, et exaltans caput meum.',
            },
            verses: [
              {
                en: 'O Lord, how many are my foes! Many are rising against me; many are saying of my soul: "There is no salvation for him in God."',
                la: 'Domine, quid multiplicati sunt qui tribulant me? Multi insurgunt adversum me; multi dicunt animae meae: Non est salus ipsi in Deo eius.',
              },
              {
                en: 'But you, O Lord, are a shield about me, my glory, and the lifter of my head. I cried aloud to the Lord, and he answered me from his holy hill.',
                la: 'Tu autem, Domine, susceptor meus es, gloria mea, et exaltans caput meum. Voce mea ad Dominum clamavi, et exaudivit me de monte sancto suo.',
              },
              {
                en: 'I lay down and slept; I woke again, for the Lord sustained me. Salvation belongs to the Lord; your blessing be upon your people!',
                la: 'Ego dormivi, et soporatus sum; et exsurrexi, quia Dominus suscepit me. Domini est salus: et super populum tuum benedictio tua.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
        ],
        scripture: {
          citation: 'Ephesians 1:3-10',
          title: 'The Eternal Plan of God in Christ',
          text: {
            en: 'Blessed be the God and Father of our Lord Jesus Christ, who has blessed us in Christ with every spiritual blessing in the heavenly places, even as he chose us in him before the foundation of the world, that we should be holy and blameless before him. In love he destined us for adoption as sons through Jesus Christ, according to the purpose of his will, to the praise of his glorious grace which he freely bestowed on us in the Beloved.',
            la: 'Benedictus Deus et Pater Domini nostri Iesu Christi, qui benedixit nos in omni benedictione spirituali in caelestibus in Christo, sicut elegit nos in ipso ante mundi constitutionem, ut essemus sancti et immaculati in conspectu eius in caritate, qui praedestinavit nos in adoptionem filiorum per Iesum Christum in ipsum, secundum propositum voluntatis suae, in laudem gloriae gratiae suae.',
          },
          responsory: {
            versicle: {
              en: 'V. In him we have redemption through his blood.',
              la: 'V. In quo habemus redemptionem per sanguinem eius.',
            },
            response: {
              en: 'R. The forgiveness of our trespasses, according to the riches of his grace.',
              la: 'R. Remissionem peccatorum, secundum divitias gratiae eius.',
            },
          },
        },
        patristicReading: {
          author: 'Saint Augustine of Hippo',
          work: 'Discourse on the Psalms (Enarratio in Psalmos 85)',
          title: 'Christ prays for us, prays in us, and is prayed to by us',
          text: {
            en: 'God could give no greater gift to men than to make his Word, through whom he created all things, their Head, and to join them to him as his members, so that he might be both Son of God and Son of man, one God with the Father, one man with men. So when we speak to God in prayer we do not separate the Son from him, and when the Body of the Son prays it does not separate its Head from itself: it is the one sole savior of his body, our Lord Jesus Christ, the Son of God, who prays for us, prays in us, and is prayed to by us.\n\nHe prays for us as our priest; he prays in us as our head; he is prayed to by us as our God. Let us then recognize our voice in his, and his voice in ours.',
            la: 'Non potuit maius munus donare hominibus Deus, quam ut Verbum suum, per quod condidit omnia, faceret illis caput, et illos ei tamquam membra coaptaret; ut esset Filius Dei et filius hominis, unus Deus cum Patre, unus homo cum hominibus: ut et quando loquimur ad Deum deprecantes, non separemus Filium; et quando precatur corpus Filii, non separet a se Caput suum: essetque ipse unus salvator corporis sui Dominus noster Iesus Christus Filius Dei, qui orat pro nobis, et orat in nobis, et oratur a nobis.\n\nOrat pro nobis ut sacerdos noster; orat in nobis ut caput nostrum; oratur a nobis ut Deus noster. Agnoscamus ergo et voces nostras in illo, et voces eius in nobis.',
          },
          responsory: {
            versicle: {
              en: 'V. Lord, teach us how to pray.',
              la: 'V. Domine, doce nos orare.',
            },
            response: {
              en: 'R. As John taught his disciples, and Christ taught his Church.',
              la: 'R. Sicut et Iohannes docuit discipulos suos, et Christus Ecclesiam suam.',
            },
          },
        },
        lordsPrayer: COMMON_LORDS_PRAYER,
        concludingPrayer: {
          en: 'Grant, we pray, almighty God, that constantly meditating on spiritual things, we may execute in both word and deed that which is pleasing in your sight. Through our Lord Jesus Christ, your Son, who lives and reigns with you in the unity of the Holy Spirit, God, for ever and ever. Amen.',
          la: 'Praesta, quaesumus, omnipotens Deus, ut, spiritualium contemplatione semper intenti, quae tibi sunt placita, et dictis exsequamur et factis. Per Dominum nostrum Iesum Christum Filium tuum, qui tecum vivit et regnat in unitate Spiritus Sancti, Deus, per omnia saecula saeculorum. Amen.',
        },
      };

    case 'lauds':
      return {
        hour: 'lauds',
        title: 'Morning Prayer (Lauds)',
        latinTitle: 'Laudes Matutinae',
        recommendedTime: 'At sunrise or early morning (6:00 AM - 8:30 AM)',
        hymn: {
          title: 'O Splendor of God’s Glory Bright',
          text: {
            en: 'O Splendor of God’s glory bright, / O Thou that bringest light from light, / O Light, of light the fountain-spring, / O Day, the day illumining.\n\nCome, very Sun of truth and love, / Come in Thy radiance from above, / And shed the Holy Spirit’s ray / On all we think or do today.',
            la: 'Splendor paternae gloriae, / de luce lucem proferens, / lux lucis et fons luminis, / dies diem illuminans.\n\nVerusque sol, illabere / micans nitore perpeti, / iubarque Sancti Spiritus / infunde nostris sensibus.',
          },
        },
        psalms: [
          {
            id: 'psalm-63',
            title: 'Psalm 63:2-9',
            subtitle: 'The soul thirsting for God',
            antiphon: {
              en: 'O God, you are my God, eagerly I seek you.',
              la: 'Deus, Deus meus es tu, ad te de luce vigilo.',
            },
            verses: [
              {
                en: 'O God, you are my God, I seek you, my soul thirsts for you; my flesh faints for you, as in a dry and weary land where no water is.',
                la: 'Deus, Deus meus es tu, ad te de luce vigilo. Sitivit in te anima mea, te desideravit caro mea in terra deserta, arida et inaquosa.',
              },
              {
                en: 'So I have looked upon you in the sanctuary, beholding your power and glory. Because your steadfast love is better than life, my lips will praise you.',
                la: 'Sic in sancto apparui tibi, ut viderem virtutem tuam et gloriam tuam. Quoniam melior est misericordia tua super vitas, labia mea laudabunt te.',
              },
              {
                en: 'So I will bless you as long as I live; I will lift up my hands in your name. My soul is satisfied as with marrow and fatness, and my mouth praises you with joyful lips.',
                la: 'Sic benedicam te in vita mea, et in nomine tuo levabo manus meas. Sicut adipe et pinguedine repleatur anima mea, et labiis exsultationis laudabit os meum.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
          {
            id: 'canticle-daniel',
            title: 'Canticle of Daniel (Dn 3:57-88, 56)',
            subtitle: 'Let all creation praise the Lord',
            antiphon: {
              en: 'Sing praise to the Lord and highly exalt him forever.',
              la: 'Hymnum dicite et superexaltate eum in saecula.',
            },
            verses: [
              {
                en: 'Bless the Lord, all works of the Lord, sing praise to him and highly exalt him forever. Bless the Lord, you angels of the Lord; bless the Lord, you heavens.',
                la: 'Benedicite, omnia opera Domini, Domino; hymnum dicite et superexaltate eum in saecula. Benedicite, angeli Domini, Domino; benedicite, caeli, Domino.',
              },
              {
                en: 'Bless the Lord, all waters above the heavens; bless the Lord, all powers of the Lord. Bless the Lord, sun and moon; bless the Lord, stars of heaven.',
                la: 'Benedicite, aquae omnes quae super caelos sunt, Domino; benedicite, omnes virtutes Domini, Domino. Benedicite, sol et luna, Domino; benedicite, stellae caeli, Domino.',
              },
              {
                en: 'Bless the Lord, nights and days; bless the Lord, light and darkness. Bless the Lord, frost and cold; bless the Lord, ice and snow.',
                la: 'Benedicite, noctes et dies, Domino; benedicite, lux et tenebrae, Domino. Benedicite, gelu et frigus, Domino; benedicite, glacies et nives, Domino.',
              },
              {
                en: 'Let the earth bless the Lord; let it sing praise to him and highly exalt him forever.',
                la: 'Benedicat terra Dominum: laudet et superexaltet eum in saecula.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
          {
            id: 'psalm-149',
            title: 'Psalm 149',
            subtitle: 'The joy of God’s holy people',
            antiphon: {
              en: 'Let the sons of Zion rejoice in their King.',
              la: 'Filii Sion exsultent in Rege suo.',
            },
            verses: [
              {
                en: 'Praise the Lord! Sing to the Lord a new song, his praise in the assembly of the faithful! Let Israel be glad in its Maker; let the children of Zion rejoice in their King!',
                la: 'Cantate Domino canticum novum; laus eius in ecclesia sanctorum. Laetetur Israel in eo qui fecit eum, et filii Sion exsultent in rege suo.',
              },
              {
                en: 'Let them praise his name with dancing, making melody to him with timbrel and lyre! For the Lord takes pleasure in his people; he adorns the humble with salvation.',
                la: 'Laudent nomen eius in choro; in tympano et psalterio psallant ei. Quia beneplacitum est Domino in populo suo, et exaltabit mansuetos in salutem.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
        ],
        scripture: {
          citation: 'Romans 13:11-13',
          text: {
            en: 'Besides this you know what hour it is, how it is full time now for you to awake from sleep. For salvation is nearer to us now than when we first believed; the night is far gone, the day is at hand. Let us then cast off the works of darkness and put on the armor of light.',
            la: 'Et hoc scientes tempus, quia hora est iam nos de somno surgere. Nunc enim propior est nostra salus quam cum credidimus. Nox praecessit, dies autem appropinquavit. Abiciamus ergo opera tenebrarum, et induamur arma lucis.',
          },
          responsory: {
            versicle: {
              en: 'V. Christ, Son of the living God, have mercy on us.',
              la: 'V. Christe, Fili Dei vivi, miserere nobis.',
            },
            response: {
              en: 'R. Christ, Son of the living God, have mercy on us.',
              la: 'R. Christe, Fili Dei vivi, miserere nobis.',
            },
          },
        },
        gospelCanticle: {
          id: 'benedictus',
          type: 'Gospel',
          title: 'Benedictus (Canticle of Zechariah - Luke 1:68-79)',
          antiphon: {
            en: 'Give light, O Lord, to those who sit in darkness and in the shadow of death.',
            la: 'Illumina, Domine, eos qui in tenebris et in umbra mortis sedent.',
          },
          verses: [
            {
              en: 'Blessed be the Lord God of Israel, for he has visited and redeemed his people, and has raised up a horn of salvation for us in the house of his servant David, as he spoke by the mouth of his holy prophets of old.',
              la: 'Benedictus Dominus Deus Israel, quia visitavit et fecit redemptionem plebi suae, et erexit cornu salutis nobis in domo David pueri sui, sicut locutus est per os sanctorum, qui a saeculo sunt, prophetarum eius.',
            },
            {
              en: 'That we should be saved from our enemies and from the hand of all who hate us; to perform the mercy promised to our fathers, and to remember his holy covenant.',
              la: 'Salutem ex inimicis nostris, et de manu omnium qui oderunt nos; ad faciendam misericordiam cum patribus nostris, et memorari testamenti sui sancti.',
            },
            {
              en: 'The oath which he swore to our father Abraham, to grant us that we, being delivered from the hand of our enemies, might serve him without fear, in holiness and righteousness before him all the days of our life.',
              la: 'Iusiurandum, quod iuravit ad Abraham patrem nostrum, daturum se nobis, ut sine timore, de manu inimicorum nostrorum liberati, serviamus illi in sanctitate et iustitia coram ipso omnibus diebus nostris.',
            },
            {
              en: 'And you, child, will be called the prophet of the Most High; for you will go before the Lord to prepare his ways, to give knowledge of salvation to his people in the forgiveness of their sins.',
              la: 'Et tu, puer, propheta Altissimi vocaberis: praeibis enim ante faciem Domini parare vias eius, ad dandam scientiam salutis plebi eius in remissionem peccatorum eorum.',
            },
            {
              en: 'Through the tender mercy of our God, when the day shall dawn upon us from on high to give light to those who sit in darkness and in the shadow of death, to guide our feet into the way of peace.',
              la: 'Per viscera misericordiae Dei nostri, in quibus visitavit nos Oriens ex alto, illuminare his qui in tenebris et in umbra mortis sedent, ad dirigendos pedes nostros in viam pacis.',
            },
          ],
          gloriaPatri: COMMON_GLORIA_PATRI,
        },
        intercessions: {
          refrain: {
            en: 'Lord, make us walk as children of the light.',
            la: 'Domine, fac nos ambulare ut filios lucis.',
          },
          petitions: [
            {
              en: 'Glorious God, creator of all things, we offer you our first thoughts and praise at the dawning of this day.',
              la: 'Gloriose Deus, omnium creator, primas cogitationes et laudes nostras tibi in primordio huius diei offerimus.',
            },
            {
              en: 'May your Holy Spirit guide our work, our conversations, and our quiet moments today, that all may be done for your glory.',
              la: 'Spiritus Sanctus tuus gubernet opera, sermones et silentia nostra hodie, ut omnia in gloriam tuam fiant.',
            },
            {
              en: 'Protect the poor, the sick, and the suffering; comfort those in despair and give peace to our families.',
              la: 'Protege pauperes, aegrotos et laborantes; consola desperantes et pacem da familiis nostris.',
            },
          ],
        },
        lordsPrayer: COMMON_LORDS_PRAYER,
        concludingPrayer: {
          en: 'Lord God, almighty Father, you have brought us safely to the beginning of this day. Defend us today by your mighty power, that we may not fall into any sin, but that all our words and actions may be directed to doing what is right in your sight. Through Christ our Lord. Amen.',
          la: 'Domine Deus omnipotens, qui ad principium huius diei nos pervenire fecisti: tua nos hodie salva virtute; ut ad nullum declinemus peccatum, sed semper ad tuam iustitiam faciendam nostra procedant eloquia, dirigantur cogitationes et opera. Per Christum Dominum nostrum. Amen.',
        },
      };

    case 'terce':
      return {
        hour: 'terce',
        title: 'Midmorning Prayer (Terce)',
        latinTitle: 'Hora Tertia',
        recommendedTime: '9:00 AM',
        hymn: {
          title: 'Come, Holy Ghost, Who Ever One',
          text: {
            en: 'Come, Holy Ghost, who ever One / Art with the Father and the Son; / Come, Holy Ghost, our souls possess / With thy full flood of holiness.',
            la: 'Nunc, Sancte, nobis, Spiritus, / unum Patri cum Filio, / dignare promptus ingeri / nostro refusus pectori.',
          },
        },
        psalms: [
          {
            id: 'psalm-119-terce',
            title: 'Psalm 119:33-40',
            subtitle: 'Prayer for light to keep the Law',
            antiphon: {
              en: 'Lead me, O Lord, in the path of your commandments.',
              la: 'Deduc me in semitam mandatorum tuorum, Domine.',
            },
            verses: [
              {
                en: 'Teach me, O Lord, the way of your statutes; and I will keep it to the end. Give me understanding, that I may keep your law and observe it with my whole heart.',
                la: 'Legem pone mihi, Domine, viam iustificationum tuarum, et exquiram eam semper. Da mihi intellectum, et scrutabor legem tuam, et custodiam illam in toto corde meo.',
              },
              {
                en: 'Lead me in the path of your commandments, for I delight in it. Incline my heart to your testimonies, and not to selfish gain!',
                la: 'Deduc me in semitam mandatorum tuorum, quia ipsam volui. Inclina cor meum in testimonia tua, et non in avaritiam.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
        ],
        scripture: {
          citation: 'Jeremiah 17:14',
          text: {
            en: 'Heal me, O Lord, and I shall be healed; save me, and I shall be saved; for you are my praise.',
            la: 'Sana me, Domine, et sanabor; salvum me fac, et salvus ero: quoniam laus mea tu es.',
          },
        },
        lordsPrayer: COMMON_LORDS_PRAYER,
        concludingPrayer: {
          en: 'Almighty God, who at the third hour sent down the Holy Spirit upon the Apostles gathered in prayer, grant us a portion of that same Spirit, that we may witness to your love before the world. Through Christ our Lord. Amen.',
          la: 'Omnipotens Deus, qui tertia hora Spiritum Sanctum super Apostolos orantes effudisti: da nobis eiusdem Spiritus participem fieri, ut amorem tuum coram mundo testificemur. Per Christum Dominum nostrum. Amen.',
        },
      };

    case 'sext':
      return {
        hour: 'sext',
        title: 'Midday Prayer (Sext)',
        latinTitle: 'Hora Sexta',
        recommendedTime: '12:00 PM (Noon)',
        hymn: {
          title: 'O God of Truth, O Lord of Might',
          text: {
            en: 'O God of truth, O Lord of might, / Who orderest time and change aright, / Who send’st the early morning ray, / And light’st the glow of perfect day.',
            la: 'Rerum, Deus, tenax vigor, / immotus in te permanens, / lucis diurnae tempora / successibus determinans.',
          },
        },
        psalms: [
          {
            id: 'psalm-123-sext',
            title: 'Psalm 123',
            subtitle: 'Prayer for mercy',
            antiphon: {
              en: 'To you I lift up my eyes, O you who are enthroned in the heavens!',
              la: 'Ad te levavi oculos meos, qui habitas in caelis.',
            },
            verses: [
              {
                en: 'To you I lift up my eyes, O you who are enthroned in the heavens! Behold, as the eyes of servants look to the hand of their master, so our eyes look to the Lord our God, till he has mercy upon us.',
                la: 'Ad te levavi oculos meos, qui habitas in caelis. Ecce sicut oculi servorum ad manus dominorum suorum, ita oculi nostri ad Dominum Deum nostrum donec misereatur nostri.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
        ],
        scripture: {
          citation: 'Galatians 6:2',
          text: {
            en: 'Bear one another’s burdens, and so fulfill the law of Christ.',
            la: 'Alter alterius onera portate, et sic adimplebitis legem Christi.',
          },
        },
        lordsPrayer: COMMON_LORDS_PRAYER,
        concludingPrayer: {
          en: 'Lord Jesus Christ, who at the sixth hour ascended the wood of the cross for the redemption of the world, grant that your light may shine upon our lives and lead us to everlasting life. Who live and reign for ever and ever. Amen.',
          la: 'Domine Iesu Christe, qui sexta hora pro redemptione mundi crucis lignum ascendisti: concede ut lux tua super vitam nostram fulgeat et nos ad vitam perducat aeternam. Qui vivis et regnas in saecula saeculorum. Amen.',
        },
      };

    case 'none':
      return {
        hour: 'none',
        title: 'Midafternoon Prayer (None)',
        latinTitle: 'Hora Nona',
        recommendedTime: '3:00 PM',
        hymn: {
          title: 'O God, Creation’s Secret Force',
          text: {
            en: 'O God, creation’s secret force, / Thyself unmoved, all motion’s source, / Who dost the light of day divide, / And guide it past the eventide.',
            la: 'Rerum, Deus, tenax vigor, / immotus in te permanens, / lucis diurnae tempora / successibus determinans.',
          },
        },
        psalms: [
          {
            id: 'psalm-126-none',
            title: 'Psalm 126',
            subtitle: 'Joyful return from exile',
            antiphon: {
              en: 'Those who sow in tears shall reap with shouts of joy!',
              la: 'Qui seminant in lacrimis, in exsultatione metent.',
            },
            verses: [
              {
                en: 'When the Lord restored the fortunes of Zion, we were like those who dream. Then our mouth was filled with laughter, and our tongue with shouts of joy.',
                la: 'In convertendo Dominus captivitatem Sion, facti sumus sicut somniantes. Tunc repletum est gaudio os nostrum, et lingua nostra exsultatione.',
              },
              {
                en: 'Restore our fortunes, O Lord, like the watercourses in the Negeb! Those who sow in tears shall reap with shouts of joy!',
                la: 'Converte, Domine, captivitatem nostram, sicut torrens in Austro. Qui seminant in lacrimis, in exsultatione metent.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
        ],
        scripture: {
          citation: '1 Corinthians 6:20',
          text: {
            en: 'You were bought with a price. So glorify God in your body.',
            la: 'Empti enim estis pretio magno. Glorificate et portate Deum in corpore vestro.',
          },
        },
        lordsPrayer: COMMON_LORDS_PRAYER,
        concludingPrayer: {
          en: 'Lord Jesus Christ, who at the ninth hour poured out your spirit on the cross and brought salvation to all mankind, grant that we, dying with you to sin, may live with you in eternal glory. Who live and reign forever and ever. Amen.',
          la: 'Domine Iesu Christe, qui hora nona in cruce spiritum tradidisti et salutem humano generi attulisti: concede ut, tecum peccato morientes, tecum in aeterna gloria vivamus. Qui vivis et regnas in saecula saeculorum. Amen.',
        },
      };

    case 'vespers':
      return {
        hour: 'vespers',
        title: 'Evening Prayer (Vespers)',
        latinTitle: 'Vesperae',
        recommendedTime: 'Sunset or evening (5:30 PM - 7:30 PM)',
        hymn: {
          title: 'O Gladsome Light (Phos Hilaron)',
          text: {
            en: 'O gladsome Light, pure brightness of the ever-living Father in heaven, O Jesus Christ, holy and blessed! Now as we come to the setting of the sun, and our eyes behold the vesper light, we sing thy praises, God: Father, Son, and Holy Spirit.',
            la: 'Lumen hilare sanctae gloriae immortalis Patris caelestis, Iesu Christe! Pervenientes ad solis occasum, videntes lumen vespertinum, laudamus Patrem, et Filium, et Spiritum Sanctum Dei.',
          },
        },
        psalms: [
          {
            id: 'psalm-110',
            title: 'Psalm 110:1-5, 7',
            subtitle: 'The Messiah, King and Priest',
            antiphon: {
              en: 'The Lord said to my Lord: Sit at my right hand.',
              la: 'Dixit Dominus Domino meo: Sede a dextris meis.',
            },
            verses: [
              {
                en: 'The Lord says to my Lord: "Sit at my right hand, till I make your enemies your footstool." The Lord sends forth from Zion your mighty scepter. Rule in the midst of your foes!',
                la: 'Dixit Dominus Domino meo: Sede a dextris meis, donec ponam inimicos tuos scabellum pedum tuorum. Virgam virtutis tuae emittet Dominus ex Sion: dominare in medio inimicorum tuorum.',
              },
              {
                en: 'Your people will offer themselves freely on the day of your power, in holy array; from the womb of the morning, like dew, your youth will come to you.',
                la: 'Tecum principium in die virtutis tuae in splendoribus sanctorum: ex utero ante luciferum genui te.',
              },
              {
                en: 'The Lord has sworn and will not change his mind: "You are a priest forever after the order of Melchizedek."',
                la: 'Iuravit Dominus, et non paenitebit eum: Tu es sacerdos in aeternum secundum ordinem Melchisedech.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
          {
            id: 'psalm-114',
            title: 'Psalm 114',
            subtitle: 'The marvels of God in the Exodus',
            antiphon: {
              en: 'Tremble, O earth, at the presence of the Lord, at the presence of the God of Jacob.',
              la: 'A facie Domini mota est terra, a facie Dei Iacob.',
            },
            verses: [
              {
                en: 'When Israel went forth from Egypt, the house of Jacob from a people of strange language, Judah became his sanctuary, Israel his dominion.',
                la: 'In exitu Israel de Aegypto, domus Iacob de populo barbaro, facta est Iudaea sanctificatio eius, Israel potestas eius.',
              },
              {
                en: 'The sea looked and fled, Jordan turned back. The mountains skipped like rams, the hills like lambs.',
                la: 'Mare vidit, et fugit; Iordanis conversus est retrorsum. Montes exsultaverunt ut arietes, et colles sicut agni ovium.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
        ],
        scripture: {
          citation: '1 Peter 1:3-5',
          text: {
            en: 'Blessed be the God and Father of our Lord Jesus Christ! By his great mercy we have been born anew to a living hope through the resurrection of Jesus Christ from the dead, and to an inheritance which is imperishable, undefiled, and unfading, kept in heaven for you.',
            la: 'Benedictus Deus et Pater Domini nostri Iesu Christi, qui secundum magnam misericordiam suam regeneravit nos in spem vivam per resurrectionem Iesu Christi ex mortuis, in hereditatem incorruptibilem et incontaminatam et immarcescibilem, conservatam in caelis in vobis.',
          },
          responsory: {
            versicle: {
              en: 'V. Our eyes have seen your salvation, O Lord.',
              la: 'V. Viderunt oculi mei salutare tuum, Domine.',
            },
            response: {
              en: 'R. Which you have prepared in the sight of all people.',
              la: 'R. Quod parasti ante faciem omnium populorum.',
            },
          },
        },
        gospelCanticle: {
          id: 'magnificat',
          type: 'Gospel',
          title: 'Magnificat (Canticle of Mary - Luke 1:46-55)',
          antiphon: {
            en: 'My soul proclaims the greatness of the Lord, and my spirit rejoices in God my Savior.',
            la: 'Magnificat anima mea Dominum, et exsultavit spiritus meus in Deo salutari meo.',
          },
          verses: [
            {
              en: 'My soul proclaims the greatness of the Lord, my spirit rejoices in God my Savior; for he has looked with favor on his lowly servant.',
              la: 'Magnificat anima mea Dominum, et exsultavit spiritus meus in Deo salutari meo, quia respexit humilitatem ancillae suae.',
            },
            {
              en: 'From this day all generations will call me blessed: the Almighty has done great things for me, and holy is his Name.',
              la: 'Ecce enim ex hoc beatam me dicent omnes generationes, quia fecit mihi magna, qui potens est, et sanctum nomen eius.',
            },
            {
              en: 'He has mercy on those who fear him in every generation. He has shown the strength of his arm, he has scattered the proud in their conceit.',
              la: 'Et misericordia eius in progenies et progenies timentibus eum. Fecit potentiam in brachio suo, dispersit superbos mente cordis sui.',
            },
            {
              en: 'He has cast down the mighty from their thrones, and has lifted up the lowly. He has filled the hungry with good things, and the rich he has sent away empty.',
              la: 'Deposuit potentes de sede, et exaltavit humiles. Esurientes implevit bonis, et divites dimisit inanes.',
            },
            {
              en: 'He has come to the help of his servant Israel for he has remembered his promise of mercy, the promise he made to our fathers, to Abraham and his children forever.',
              la: 'Suscepit Israel puerum suum, memoratus misericordiae suae, sicut locutus est ad patres nostros, Abraham et semini eius in saecula.',
            },
          ],
          gloriaPatri: COMMON_GLORIA_PATRI,
        },
        intercessions: {
          refrain: {
            en: 'Lighten our darkness, Lord, we pray.',
            la: 'Illumina tenebras nostras, Domine, quaesumus.',
          },
          petitions: [
            {
              en: 'As the sun sets, we give thanks for all the graces, strength, and work of this day.',
              la: 'Solis occasu, gratias agimus pro omnibus gratiis, viribus et operibus huius diei.',
            },
            {
              en: 'Grant peace to nations torn by conflict, comfort to the grieving, and healing to the sick.',
              la: 'Da pacem gentibus bello vexatis, solacium maerentibus et sanitatem aegrotis.',
            },
            {
              en: 'Remember our faithful departed: bring them into the light of your heavenly vision.',
              la: 'Memento fidelium defunctorum nostrorum: perduc eos in lucem visionis tuae caelestis.',
            },
          ],
        },
        lordsPrayer: COMMON_LORDS_PRAYER,
        concludingPrayer: {
          en: 'Stay with us, Lord, for evening draws near and the day is now past. Be our companion on our way, warm our hearts and awaken hope, that we may recognize you in the Scriptures and in the breaking of bread. Who live and reign with God the Father in the unity of the Holy Spirit, God for ever and ever. Amen.',
          la: 'Mane nobiscum, Domine, quoniam advesperascit et inclinata est iam dies: esto comes itineris nostri, accende corda nostra et excita spem, ut te agnoscamus in Scripturis et in fractione panis. Qui vivis et regnas cum Deo Patre in unitate Spiritus Sancti, Deus per omnia saecula saeculorum. Amen.',
        },
      };

    case 'compline':
      return {
        hour: 'compline',
        title: 'Night Prayer (Compline)',
        latinTitle: 'Completorium',
        recommendedTime: 'Before bedtime (9:00 PM - 11:00 PM)',
        hymn: {
          title: 'Before the Ending of the Day (Te Lucis Ante Terminum)',
          text: {
            en: 'Before the ending of the day, / Creator of the world, we pray / That with thy wonted favor thou / Wouldst be our guard and keeper now.\n\nFrom all ill dreams defend our eyes, / From nightly fears and fantasies; / Tread under foot our ghostly foe, / That no pollution we may know.',
            la: 'Te lucis ante terminum, / rerum Creator, poscimus, / ut solita clementia / sis praesul ad custodiam.\n\nProcul recedant somnia / et noctium phantasmata, / hostemque nostrum comprime, / ne polluantur corpora.',
          },
        },
        psalms: [
          {
            id: 'psalm-4',
            title: 'Psalm 4',
            subtitle: 'Evening prayer of trust in God',
            antiphon: {
              en: 'Have mercy on me, O Lord, and hear my prayer.',
              la: 'Miserere mihi, Domine, et exaudi orationem meam.',
            },
            verses: [
              {
                en: 'Answer me when I call, O God of my right! You have given me room when I was in distress. Be gracious to me, and hear my prayer.',
                la: 'Cum invocarem exaudivit me Deus iustitiae meae: in tribulatione dilatasti mihi. Miserere mihi, et exaudi orationem meam.',
              },
              {
                en: 'Know that the Lord has set apart the godly for himself; the Lord hears when I call to him. Offer right sacrifices, and put your trust in the Lord.',
                la: 'Et scitote quoniam mirificavit Dominus sanctum suum: Dominus exaudiet me cum clamavero ad eum. Sacrificate sacrificium iustitiae, et sperate in Domino.',
              },
              {
                en: 'In peace I will both lie down and sleep; for you alone, O Lord, make me dwell in safety.',
                la: 'In pace in idipsum dormiam, et requiescam; quoniam tu, Domine, singulariter in spe constituisti me.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
          {
            id: 'psalm-134',
            title: 'Psalm 134',
            subtitle: 'Night praise in the sanctuary',
            antiphon: {
              en: 'Bless the Lord, all you servants of the Lord.',
              la: 'Benedicite Dominum, omnes servi Domini.',
            },
            verses: [
              {
                en: 'Come, bless the Lord, all you servants of the Lord, who stand by night in the house of the Lord! Lift up your hands to the holy place, and bless the Lord!',
                la: 'Ecce nunc benedicite Dominum, omnes servi Domini: qui statis in domo Domini, in noctibus. In altis levate manus vestras ad sancta, et benedicite Dominum.',
              },
              {
                en: 'May the Lord bless you from Zion, he who made heaven and earth!',
                la: 'Benedicat te Dominus ex Sion, qui fecit caelum et terram.',
              },
            ],
            gloriaPatri: COMMON_GLORIA_PATRI,
          },
        ],
        scripture: {
          citation: 'Jeremiah 14:9',
          text: {
            en: 'You are in our midst, O Lord, and we are called by your name; do not leave us, O Lord our God.',
            la: 'Tu autem in nobis es, Domine, et nomen sanctum tuum invocatum est super nos: ne derelinquas nos, Domine Deus noster.',
          },
          responsory: {
            versicle: {
              en: 'V. Into your hands, Lord, I commend my spirit.',
              la: 'V. In manus tuas, Domine, commendo spiritum meum.',
            },
            response: {
              en: 'R. You have redeemed us, Lord, God of truth.',
              la: 'R. Redemisti nos, Domine, Deus veritatis.',
            },
          },
        },
        gospelCanticle: {
          id: 'nunc-dimittis',
          type: 'Gospel',
          title: 'Nunc Dimittis (Canticle of Simeon - Luke 2:29-32)',
          antiphon: {
            en: 'Protect us, Lord, as we stay awake; watch over us as we sleep, that awake we may keep watch with Christ, and asleep, rest in his peace.',
            la: 'Salva nos, Domine, vigilantes, custodi nos dormientes: ut vigilemus cum Christo, et requiescamus in pace.',
          },
          verses: [
            {
              en: 'Lord, now you let your servant go in peace; your word has been fulfilled.',
              la: 'Nunc dimittis servum tuum, Domine, secundum verbum tuum in pace.',
            },
            {
              en: 'My own eyes have seen the salvation which you have prepared in the sight of every people: a light to reveal you to the nations and the glory of your people Israel.',
              la: 'Quia viderunt oculi mei salutare tuum, quod parasti ante faciem omnium populorum: lumen ad revelationem gentium, et gloriam plebis tuae Israel.',
            },
          ],
          gloriaPatri: COMMON_GLORIA_PATRI,
        },
        lordsPrayer: COMMON_LORDS_PRAYER,
        concludingPrayer: {
          en: 'Visit this house, we beseech you, Lord, and drive far from it all snares of the enemy. Let your holy angels dwell herein to preserve us in peace, and let your blessing be upon us always. Through Christ our Lord. Amen.',
          la: 'Visita, quaesumus, Domine, habitationem istam, et omnes insidias inimici ab ea longe repelle: Angeli tui sancti habitent in ea, qui nos in pace custodiant; et benedictio tua sit super nos semper. Per Christum Dominum nostrum. Amen.',
        },
        marianAntiphon: MARIAN_ANTIPHONS.salveRegina,
      };
  }
}
