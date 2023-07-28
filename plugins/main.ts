import { useAppStore } from '@/store/app'
import { useAnnStore } from '@/store/announce'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import { useRequestStore } from '@/store/requests'
import { Applicant } from 'interfaces/interfaces'
import { useTasksStore } from '@/store/tasks'
import { useProfileStore } from '@/store/profile'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(setupCalendar, {})
  nuxtApp.vueApp.component('VCalendar', Calendar)
  nuxtApp.vueApp.component('DatePicker', DatePicker)

  const { $router, _route, $SB } = useNuxtApp()
  const app_loading = ref(false)

  watchEffect(() => {
    if (app_loading.value) {
      useAppStore().setAppLoading(app_loading.value)
    }
  })

  function formatDateWords(date: Date): string {
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()

    const ordinalSuffix = getOrdinalSuffix(day)
    const formattedDate = `${day}${ordinalSuffix} ${month}, ${year}`

    return formattedDate
  }

  function formatDateTime(date: Date) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  function getOrdinalSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th'
    }

    const lastDigit = day % 10

    switch (lastDigit) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const formatDate = (date: Date | null) => {
    if (date == null) {
      return ''
    } else {
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = String(date.getFullYear())

      return `${day}/${month}/${year}`
    }
  }

  function replaceWardWithImagePaths(
    wardArray: string[],
    imagePathsArray: string[]
  ): string[] {
    return wardArray.map(ward => {
      const matchingPath = imagePathsArray.find(path =>
        path.includes(ward + '.jpg')
      )
      return matchingPath ? matchingPath : ward
    })
  }

  const onInitLoadAppData = async () => {
    app_loading.value = true
    try {
      let currentSession = await $SB.auth.getSession()
      console.log(currentSession.data.session)

      if (currentSession.data.session == null) {
        throw currentSession.error
      } else {
        let {
          data: { user },
        } = await $SB.auth.getUser()

        const asyncFunctions = [
          // useAppStore().getAllMyApls,
          useAppStore().getTotalApls,
          useAppStore().getPrices,
          useAnnStore().getAnnounce,
          useRequestStore().getRequests,
          useTasksStore().getTasks,
          useProfileStore().getProfile,
        ]

        Promise.allSettled(asyncFunctions.map(fn => fn()))
          .then(results => {
            // console.log('All promises resolved!')
            // console.log(results)
            app_loading.value = false
          })
          .catch(error => {
            console.error('An error occurred:', error)
          })

        if (_route.path == '/') {
          $router.push('/dashboard')
        }
        await $SB.auth.startAutoRefresh()
        // app_loading.value = false
        return user
      }
    } catch (error) {
      $router.push('/')
      console.log(error)
      app_loading.value = false
    } finally {
      app_loading.value = false
    }
  }

  const loadAppData = async () => {
    app_loading.value = true
    try {
      let currentSession = await $SB.auth.getSession()

      if (currentSession.data.session == null) {
        throw currentSession.error
      } else {
        let {
          data: { user },
        } = await $SB.auth.getUser()

        const asyncFunctions = [
          useAppStore().getTotalApls,
          useAppStore().getPrices,
          useAnnStore().getAnnounce,
          useRequestStore().getRequests,
          useTasksStore().getTasks,
          useProfileStore().getProfile,
        ]

        Promise.allSettled(asyncFunctions.map(fn => fn()))
          .then(results => {
            // console.log('All promises resolved!')
            // console.log(results)
            app_loading.value = false
          })
          .catch(error => {
            console.error('An error occurred:', error)
          })

        return user
      }
    } catch (error) {
      $router.push('/')
      console.log(error)
      app_loading.value = false
    }
  }

  function extractNumFromPhrase(phrase: string): number | null {
    const regex = /ward(\d+)/ // Matches "ward" followed by one or more digits
    const match = phrase.match(regex)

    if (match && match[1]) {
      return parseInt(match[1], 10)
    } else {
      return null
    }
  }

  const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo, Democratic Republic of the',
    'Congo, Republic of the',
    'Costa Rica',
    "Cote d'Ivoire",
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor (Timor-Leste)',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, North',
    'Korea, South',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar (Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Macedonia (formerly Macedonia)',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ]

  function sortByRecency(apls: Applicant[]): Applicant[] {
    return apls.sort(
      (a, b) =>
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    )
  }

  return {
    provide: {
      loadAppData,
      onInitLoadAppData,
      formatDate,
      formatDateTime,
      formatDateWords,
      countries,
      app_loading,
      extractNumFromPhrase,
      replaceWardWithImagePaths,
      sortByRecency,
    },
  }
})
