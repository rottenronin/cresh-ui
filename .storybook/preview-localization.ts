type StorybookLocale = 'en' | 'fr' | 'de' | 'es' | 'it' | 'cn'

type TranslationDictionary = Record<Exclude<StorybookLocale, 'en'>, Record<string, string>>

const translations: TranslationDictionary = {
  de: {
    Name: 'Name',
    Description: 'Beschreibung',
    Default: 'Standard',
    Control: 'Steuerung',
    Props: 'Props',
    Events: 'Ereignisse',
    Slots: 'Slots',
    'Set string': 'Text setzen',
    'Set boolean': 'Booleschen Wert setzen',
    'Set number': 'Zahl setzen',
    'Set object': 'Objekt setzen',
    'Set other': 'Wert setzen',
    'Show code': 'Code anzeigen',
    'Checked state (v-model binding)': 'Ausgewählter Zustand (v-model-Bindung)',
    'Label text': 'Beschriftungstext',
    'Input name attribute': 'Name-Attribut des Eingabefelds',
    'Disable the checkbox': 'Kontrollkästchen deaktivieren',
    'The input value (v-model binding)': 'Eingabewert (v-model-Bindung)',
    'Label for the input field': 'Beschriftung für das Eingabefeld',
    'Placeholder text': 'Platzhaltertext',
    'Input type': 'Eingabetyp',
    'Disable the input': 'Eingabe deaktivieren',
    'Selected value (v-model binding)': 'Ausgewählter Wert (v-model-Bindung)',
    'Label for the select': 'Beschriftung für die Auswahl',
    'Disable the select': 'Auswahl deaktivieren',
    'Disable the radio button': 'Optionsfeld deaktivieren',
    'The value of this radio option': 'Wert dieser Radio-Option',
    'Disable the switch': 'Schalter deaktivieren',
    'Switch state (v-model binding)': 'Schalterzustand (v-model-Bindung)',
    'Switch label': 'Schalterbeschriftung',
    'Button variant/style': 'Button-Variante/Stil',
    'Button size': 'Button-Größe',
    'Disable the button': 'Button deaktivieren',
    'Show loading state': 'Ladezustand anzeigen',
    'Progress value (0-100)': 'Fortschrittswert (0-100)',
    'Progress bar color': 'Farbe der Fortschrittsleiste',
    'Indeterminate loading state': 'Unbestimmter Ladezustand',
    'Image source URL': 'Bildquell-URL',
    'Alternative text for accessibility': 'Alternativtext für Barrierefreiheit',
    'Tooltip title on hover': 'Tooltip-Titel beim Hover',
    'Fallback image URL for errors': 'Fallback-Bild-URL bei Fehlern',
    'Error message text': 'Fehlermeldungstext',
    'Show error message text': 'Fehlermeldung anzeigen',
    'Image width in pixels': 'Bildbreite in Pixeln',
    'Image height in pixels': 'Bildhöhe in Pixeln',
    'Aspect ratio preset': 'Seitenverhältnis-Voreinstellung',
    'Enable lazy loading': 'Lazy Loading aktivieren',
    'Responsive image srcset': 'Responsives Bild-Set',
    'Array of items with key and value': 'Array von Einträgen mit Schlüssel und Wert',
    'Dropdown open/closed state': 'Dropdown geöffnet/geschlossen',
    'Show chevron icon': 'Chevron-Symbol anzeigen',
    'Pre-selected item': 'Vorab ausgewählter Eintrag',
    'Alert type': 'Alarmtyp',
    'Alert title': 'Alarmtitel',
    'Show close button': 'Schließen-Schaltfläche anzeigen',
    'Error message (string, array, or object with message property)': 'Fehlermeldung (String, Array oder Objekt mit Nachricht)',
    'Hide the error icon': 'Fehlersymbol ausblenden',
    'Empty state message': 'Leerzustandsnachricht',
    'Icon name from icon library': 'Icon-Name aus der Bibliothek',
    'Card title': 'Kartentitel',
    'Show card border': 'Kartenrahmen anzeigen',
    'Show card shadow': 'Kartenschatten anzeigen',
    'Show/hide modal': 'Modal anzeigen/ausblenden',
    'Modal title': 'Modaltitel',
    'Prevent closing on background click': 'Schließen bei Hintergrundklick verhindern',
    'Modal width in pixels': 'Modalbreite in Pixeln',
    'Hide footer with action buttons': 'Footer mit Aktionsbuttons ausblenden',
    'Document label': 'Dokumentbezeichnung',
    'Document link/URL': 'Dokumentlink/URL',
    'Approval status (undefined, true, or false)': 'Freigabestatus (undefined, true oder false)',
    'Available actions: upload, validate, download, read': 'Verfügbare Aktionen: hochladen, validieren, herunterladen, lesen',
    'Show/hide the document viewer modal': 'Dokumentenanzeige-Modal anzeigen/ausblenden',
    'Document to display (label, link, extension)': 'Anzuzeigendes Dokument (Bezeichnung, Link, Erweiterung)',
    'Hide navigation arrows': 'Navigationspfeile ausblenden',
    'Hide left arrow': 'Linken Pfeil ausblenden',
    'Hide right arrow': 'Rechten Pfeil ausblenden',
    'Maximum file size in KB (default: 2048)': 'Maximale Dateigröße in KB (Standard: 2048)',
    'Array of valid MIME types': 'Array gültiger MIME-Typen',
    'Show uploaded filename': 'Hochgeladenen Dateinamen anzeigen',
    'Drawer placement position': 'Position des Drawers',
    'Drawer width in pixels (for left/right placement)': 'Drawer-Breite in Pixeln (für links/rechts)',
    'Drawer height in pixels (for top/bottom placement)': 'Drawer-Höhe in Pixeln (für oben/unten)',
    'Mobile breakpoint width to auto-close drawer': 'Mobiler Breakpoint zum automatischen Schließen des Drawers',
    'Whether the drawer is open': 'Ob der Drawer geöffnet ist',
    'Array of step items': 'Array von Schritten',
    'Allow clicking on steps to navigate': 'Klicken auf Schritte zur Navigation erlauben',
    'Currently selected step index': 'Aktuell ausgewählter Schrittindex',
    'Array of step items with state': 'Array von Schritten mit Status',
    'Default date filter': 'Standard-Datumsfilter',
    'Date range array [startDate, endDate]': 'Datumsbereich-Array [Startdatum, Enddatum]',
    'Which input initiated the selection': 'Welches Feld die Auswahl gestartet hat',
    'Allow navigation between steps': 'Navigation zwischen Schritten erlauben',
    'Menu title': 'Menütitel',
    'Currently selected menu item': 'Aktuell ausgewählter Menüpunkt',
    'Divider direction': 'Ausrichtung des Trenners',
    'Optional text to display': 'Optional anzuzeigender Text',
    'Tag color/type': 'Tag-Farbe/-Typ',
    'Spinner size': 'Spinner-Größe',
    'Spinner color': 'Spinner-Farbe',
    'Make tabs read-only': 'Tabs schreibgeschützt machen',
    'Accept terms and conditions': 'Allgemeine Geschäftsbedingungen akzeptieren',
    'Checked:': 'Aktiviert:',
    'This option is disabled': 'Diese Option ist deaktiviert',
    'Disabled and checked': 'Deaktiviert und aktiviert',
    'Full Name': 'Vollständiger Name',
    'Enter your full name': 'Geben Sie Ihren vollständigen Namen ein',
    'Value:': 'Wert:',
    Email: 'E-Mail',
    'Enter your email': 'Geben Sie Ihre E-Mail ein',
    Password: 'Passwort',
    'Enter your password': 'Geben Sie Ihr Passwort ein',
    'Disabled Input': 'Deaktivierte Eingabe',
    'Input with Error': 'Eingabe mit Fehler',
    'Primary Button': 'Primärer Button',
    'Secondary Button': 'Sekundärer Button',
    Delete: 'Löschen',
    'Disabled Button': 'Deaktivierter Button',
    'Loading...': 'Lädt...',
    Small: 'Klein',
    'Large Button': 'Großer Button',
    'Project A - 30%': 'Projekt A - 30 %',
    'Project B - 60%': 'Projekt B - 60 %',
    'Project C - 100%': 'Projekt C - 100 %',
    'Loading - Indeterminate': 'Ladevorgang - Unbestimmt',
  },
  fr: {
    Description: 'Description',
    Default: 'Defaut',
    Control: 'Controle',
    Props: 'Props',
    Events: 'Evenements',
    Slots: 'Slots',
    'Set string': 'Definir une chaine',
    'Set boolean': 'Definir un booleen',
    'Set number': 'Definir un nombre',
    'Set object': 'Definir un objet',
    'Set other': 'Definir une valeur',
    'Show code': 'Afficher le code',
    'Checked state (v-model binding)': 'Etat coche (liaison v-model)',
    'Label text': 'Texte du libelle',
    'Input name attribute': 'Attribut name du champ',
    'Disable the checkbox': 'Desactiver la case a cocher',
    'The input value (v-model binding)': 'Valeur du champ (liaison v-model)',
    'Label for the input field': 'Libelle du champ de saisie',
    'Placeholder text': 'Texte du placeholder',
    'Input type': 'Type de champ',
    'Disable the input': 'Desactiver le champ',
    'Selected value (v-model binding)': 'Valeur selectionnee (liaison v-model)',
    'Label for the select': 'Libelle de la liste',
    'Disable the select': 'Desactiver la liste',
    'Disable the radio button': 'Desactiver le bouton radio',
    'Button variant/style': 'Variante/style du bouton',
    'Button size': 'Taille du bouton',
    'Disable the button': 'Desactiver le bouton',
    'Show loading state': 'Afficher l etat de chargement',
    'Progress value (0-100)': 'Valeur de progression (0-100)',
    'Progress bar color': 'Couleur de la barre de progression',
    'Indeterminate loading state': 'Etat de chargement indetermine',
    'Alert type': 'Type d alerte',
    'Alert title': 'Titre de l alerte',
    'Show close button': 'Afficher le bouton de fermeture',
    'Accept terms and conditions': 'Accepter les termes et conditions',
    'Checked:': 'Coche :',
    'This option is disabled': 'Cette option est desactivee',
    'Disabled and checked': 'Desactivee et cochee',
    'Full Name': 'Nom complet',
    'Enter your full name': 'Saisissez votre nom complet',
    'Value:': 'Valeur :',
    Email: 'E-mail',
    'Enter your email': 'Saisissez votre e-mail',
    Password: 'Mot de passe',
    'Enter your password': 'Saisissez votre mot de passe',
    'Disabled Input': 'Champ desactive',
    'Input with Error': 'Champ avec erreur',
    'Primary Button': 'Bouton principal',
    'Secondary Button': 'Bouton secondaire',
    Delete: 'Supprimer',
    'Disabled Button': 'Bouton desactive',
    'Loading...': 'Chargement...',
    Small: 'Petit',
    'Large Button': 'Grand bouton',
    'Project A - 30%': 'Projet A - 30 %',
    'Project B - 60%': 'Projet B - 60 %',
    'Project C - 100%': 'Projet C - 100 %',
    'Loading - Indeterminate': 'Chargement - Indetermine',
  },
  es: {
    Description: 'Descripcion',
    Default: 'Predeterminado',
    Control: 'Control',
    Props: 'Props',
    Events: 'Eventos',
    Slots: 'Slots',
    'Set string': 'Definir texto',
    'Set boolean': 'Definir booleano',
    'Set number': 'Definir numero',
    'Set object': 'Definir objeto',
    'Set other': 'Definir valor',
    'Show code': 'Mostrar codigo',
    'Checked state (v-model binding)': 'Estado marcado (v-model)',
    'Label text': 'Texto de la etiqueta',
    'Input name attribute': 'Atributo name del campo',
    'Disable the checkbox': 'Desactivar la casilla',
    'The input value (v-model binding)': 'Valor del campo (v-model)',
    'Label for the input field': 'Etiqueta del campo',
    'Placeholder text': 'Texto de placeholder',
    'Input type': 'Tipo de entrada',
    'Disable the input': 'Desactivar la entrada',
    'Selected value (v-model binding)': 'Valor seleccionado (v-model)',
    'Label for the select': 'Etiqueta del selector',
    'Disable the select': 'Desactivar el selector',
    'Disable the radio button': 'Desactivar el boton de opcion',
    'Button variant/style': 'Variante/estilo del boton',
    'Button size': 'Tamano del boton',
    'Disable the button': 'Desactivar el boton',
    'Show loading state': 'Mostrar estado de carga',
    'Progress value (0-100)': 'Valor de progreso (0-100)',
    'Progress bar color': 'Color de la barra de progreso',
    'Indeterminate loading state': 'Estado de carga indeterminado',
    'Accept terms and conditions': 'Aceptar terminos y condiciones',
    'Checked:': 'Marcado:',
    'This option is disabled': 'Esta opcion esta desactivada',
    'Disabled and checked': 'Desactivado y marcado',
    'Full Name': 'Nombre completo',
    'Enter your full name': 'Introduzca su nombre completo',
    'Value:': 'Valor:',
    Email: 'Correo electronico',
    'Enter your email': 'Introduzca su correo electronico',
    Password: 'Contrasena',
    'Enter your password': 'Introduzca su contrasena',
    'Disabled Input': 'Entrada desactivada',
    'Input with Error': 'Entrada con error',
    'Primary Button': 'Boton principal',
    'Secondary Button': 'Boton secundario',
    Delete: 'Eliminar',
    'Disabled Button': 'Boton desactivado',
    'Loading...': 'Cargando...',
    Small: 'Pequeno',
    'Large Button': 'Boton grande',
  },
  it: {
    Description: 'Descrizione',
    Default: 'Predefinito',
    Control: 'Controllo',
    Props: 'Props',
    Events: 'Eventi',
    Slots: 'Slots',
    'Set string': 'Imposta testo',
    'Set boolean': 'Imposta booleano',
    'Set number': 'Imposta numero',
    'Set object': 'Imposta oggetto',
    'Set other': 'Imposta valore',
    'Show code': 'Mostra codice',
    'Checked state (v-model binding)': 'Stato selezionato (binding v-model)',
    'Label text': 'Testo etichetta',
    'Input name attribute': 'Attributo name del campo',
    'Disable the checkbox': 'Disabilita la checkbox',
    'The input value (v-model binding)': 'Valore input (binding v-model)',
    'Label for the input field': 'Etichetta del campo',
    'Placeholder text': 'Testo segnaposto',
    'Input type': 'Tipo di input',
    'Disable the input': 'Disabilita l input',
    'Selected value (v-model binding)': 'Valore selezionato (binding v-model)',
    'Label for the select': 'Etichetta della select',
    'Disable the select': 'Disabilita la select',
    'Disable the radio button': 'Disabilita il pulsante radio',
    'Button variant/style': 'Variante/stile del pulsante',
    'Button size': 'Dimensione del pulsante',
    'Disable the button': 'Disabilita il pulsante',
    'Show loading state': 'Mostra stato di caricamento',
    'Progress value (0-100)': 'Valore di avanzamento (0-100)',
    'Progress bar color': 'Colore della barra di avanzamento',
    'Indeterminate loading state': 'Stato di caricamento indeterminato',
    'Accept terms and conditions': 'Accetta termini e condizioni',
    'Checked:': 'Selezionato:',
    'This option is disabled': 'Questa opzione e disabilitata',
    'Disabled and checked': 'Disabilitato e selezionato',
    'Full Name': 'Nome completo',
    'Enter your full name': 'Inserisci il tuo nome completo',
    'Value:': 'Valore:',
    Email: 'Email',
    'Enter your email': 'Inserisci la tua email',
    Password: 'Password',
    'Enter your password': 'Inserisci la tua password',
    'Disabled Input': 'Input disabilitato',
    'Input with Error': 'Input con errore',
    'Primary Button': 'Pulsante primario',
    'Secondary Button': 'Pulsante secondario',
    Delete: 'Elimina',
    'Disabled Button': 'Pulsante disabilitato',
    'Loading...': 'Caricamento...',
    Small: 'Piccolo',
    'Large Button': 'Pulsante grande',
  },
  cn: {
    Description: '描述',
    Default: '默认值',
    Control: '控件',
    Props: '属性',
    Events: '事件',
    Slots: '插槽',
    'Set string': '设置文本',
    'Set boolean': '设置布尔值',
    'Set number': '设置数字',
    'Set object': '设置对象',
    'Set other': '设置值',
    'Show code': '显示代码',
    'Checked state (v-model binding)': '选中状态（v-model 绑定）',
    'Label text': '标签文本',
    'Input name attribute': '输入框 name 属性',
    'Disable the checkbox': '禁用复选框',
    'The input value (v-model binding)': '输入值（v-model 绑定）',
    'Label for the input field': '输入框标签',
    'Placeholder text': '占位文本',
    'Input type': '输入类型',
    'Disable the input': '禁用输入框',
    'Selected value (v-model binding)': '选中值（v-model 绑定）',
    'Label for the select': '选择框标签',
    'Disable the select': '禁用选择框',
    'Disable the radio button': '禁用单选按钮',
    'Button variant/style': '按钮变体/样式',
    'Button size': '按钮尺寸',
    'Disable the button': '禁用按钮',
    'Show loading state': '显示加载状态',
    'Progress value (0-100)': '进度值（0-100）',
    'Progress bar color': '进度条颜色',
    'Indeterminate loading state': '不确定加载状态',
    'Accept terms and conditions': '接受条款和条件',
    'Checked:': '选中：',
    'This option is disabled': '该选项已禁用',
    'Disabled and checked': '已禁用且已选中',
    'Full Name': '姓名',
    'Enter your full name': '请输入您的姓名',
    'Value:': '值：',
    Email: '邮箱',
    'Enter your email': '请输入您的邮箱',
    Password: '密码',
    'Enter your password': '请输入您的密码',
    'Disabled Input': '禁用输入框',
    'Input with Error': '带错误的输入框',
    'Primary Button': '主按钮',
    'Secondary Button': '次按钮',
    Delete: '删除',
    'Disabled Button': '禁用按钮',
    'Loading...': '加载中...',
    Small: '小',
    'Large Button': '大按钮',
  },
}

const ignoredTags = new Set(['CODE', 'PRE', 'SCRIPT', 'STYLE'])
const textSources = new WeakMap<Text, string>()
const attributeSources = new WeakMap<Element, Record<string, string>>()

let observer: MutationObserver | null = null
let currentLocale: StorybookLocale = 'en'
let isApplying = false

function translateValue(input: string, locale: StorybookLocale) {
  if (locale === 'en') {
    return input
  }

  const dictionary = translations[locale]

  return Object.entries(dictionary)
    .sort((left, right) => right[0].length - left[0].length)
    .reduce((value, [source, target]) => value.split(source).join(target), input)
}

function shouldIgnoreTextNode(node: Text) {
  const parent = node.parentElement

  if (!parent) {
    return true
  }

  return ignoredTags.has(parent.tagName) || Boolean(parent.closest('code, pre, .docblock-source'))
}

function localizeTextNode(node: Text) {
  if (shouldIgnoreTextNode(node)) {
    return
  }

  if (!textSources.has(node)) {
    textSources.set(node, node.textContent || '')
  }

  const source = textSources.get(node) || ''
  const translated = translateValue(source, currentLocale)

  if (node.textContent !== translated) {
    node.textContent = translated
  }
}

function localizeAttribute(element: Element, attribute: string) {
  const value = element.getAttribute(attribute)

  if (!value) {
    return
  }

  const attributes = attributeSources.get(element) || {}

  if (!(attribute in attributes)) {
    attributes[attribute] = value
    attributeSources.set(element, attributes)
  }

  const translated = translateValue(attributes[attribute], currentLocale)

  if (element.getAttribute(attribute) !== translated) {
    element.setAttribute(attribute, translated)
  }
}

function walkAndLocalize(root: ParentNode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let currentNode = walker.nextNode()

  while (currentNode) {
    localizeTextNode(currentNode as Text)
    currentNode = walker.nextNode()
  }

  root.querySelectorAll?.('[placeholder], [title], [aria-label]').forEach((element) => {
    localizeAttribute(element, 'placeholder')
    localizeAttribute(element, 'title')
    localizeAttribute(element, 'aria-label')
  })
}

function applyLocalization() {
  if (typeof document === 'undefined' || !document.body || isApplying) {
    return
  }

  isApplying = true

  try {
    walkAndLocalize(document.body)
  } finally {
    isApplying = false
  }
}

export function installStorybookPreviewLocalization(locale: StorybookLocale) {
  currentLocale = locale

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  if (!observer) {
    observer = new MutationObserver(() => {
      applyLocalization()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['placeholder', 'title', 'aria-label'],
    })
  }

  window.requestAnimationFrame(() => {
    applyLocalization()
  })
}