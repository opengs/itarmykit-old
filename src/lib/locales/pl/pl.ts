import { en } from '../en/en'

export const pl: typeof en = {
    auth: {
        email: 'Email',
        password: 'Hasło',
        exampleEmail: 'janusz@gmail.com',
        signin: {
            name: 'Zaloguj',
            title: 'Zaloguj się do swojego konta',
            forgotPassword: 'Zapomniałeś hasła?',
            error: 'Nie udało się zalogować.',
            toastSucces: 'Udało się zalogować.',
            toastError: 'Wystąpił błąd podczas logowania.',
        },
        signup: {
            name: 'Zarejestruj',
            title: 'Tworzenie konta',
            confirmPassword: 'Powtórz hasło',
            error: 'Nie udało się zarejestrować.',
            toastSucces: 'Udało się zarejestrować',
            toastError: 'Wystąpił błąd podczas rejestracji.',
        },
    },
    dashboard: {
        title: 'Pulpit',
        ddos: 'DDOS Atak',
        selectModule: 'Wybierz Moduł',
        selectAnDdos: 'Wybierz DDOS',
        settings: {
            title: 'Ustawienia',
            gui: 'Gui',
            module: 'Moduł',
            logs: 'Logi',
            hide: 'Ukryj',
            autoStart: 'Uruchamianie przy starcie systemu',
            autoUpdates: 'Automatyczne aktualizacje',
            theme: 'Zmień motyw',
        },
        downloader: {
            status: 'Status pobierania',
            error: 'Błąd',
        },
        myid: 'Moje ID',
        signOut: 'Wyloguj',
        session: {
            title: 'Sesja',
            timeAttacked: 'Próby żądań',
            efficiency: 'Efektywność',
            incomingTraffic: 'Ruch przychodzący',
            outgoingTraffic: 'Ruch wychodzący',
        },
        chart: {
            minute: 'Na Minuty',
            hours: 'Na Godziny',
            display: 'Przełącz',
        },
    },
    profiles: {
        gretting: 'Witaj',
        headline: 'Wybierz jeden z wielu profilów',
        work: 'Komputer w pracy',
        home: 'Użytkownik domowy',
        institiution: 'Instytucja',
        advanced: 'Zaawansowany użytkownik',
        buttonCon: 'Kontynuuj',
        buttonCan: 'Anuluj',
    },
    modules: {
        name: 'UA MODULE',
        authors: 'cyka',
        description: 'ldwadwadwadwdw',
        checkUpdates: 'Sprawdź aktualizacje',
        logs: 'Logi',
        parallelism: 'Automatyczny poziom równoległości',
        scale: 'Skala ataku',
        interval: 'Minimalny odstęp',
        download: 'Pobierz',
        newVersion: 'Nowa aktualizacja modułu {{nameModule}} do wersji {{version}}',
    },
    moduleInfo: {
        noUpdatedDetected: 'Automatyczne sprawdzanie nie wykrywa nowych aktualizacji',
        noAction: 'Nie znaleziono release',
        currentVersion: 'Bieżąca wersja jest już zainstalowana',
        notFoundPlatform: 'Nie znaleziono pasujących plików do pobrania dla tej platformy',
        apiGitHubError: 'API github nie działa',
        unsupported: 'Nieobsługiwany system operacyjny',
        moduleNotFound: 'Nie znaleziono modułu',
        attackOFF: 'Atak został wyłączony',
        noSupport: 'Beak wsparcia dla i18next',
        download: 'Pobieranie modułu',
        downloadError: 'Pobieranie nie powiodło się',
    },
}
