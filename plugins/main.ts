import { useAppStore } from '@/store/app'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(setupCalendar, {})
  nuxtApp.vueApp.component('VCalendar', Calendar)
  nuxtApp.vueApp.component('DatePicker', DatePicker)

  const { $router, _route } = useNuxtApp()

  const formatDate = (date: Date) => {
    if (!date) return ''
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  const onInitLoadAppData = async () => {
    try {
      let currentSession = await useSupabaseClient().auth.getSession()
      console.log(currentSession.data)

      if (currentSession.data.session == null) {
        throw currentSession.error
      } else {
        let {
          data: { user },
        } = await useSupabaseClient().auth.getUser()
        useAppStore().logged = true

        if (_route.path == '/') {
          $router.push('/dashboard')
        }
        return user
      }
    } catch (error) {
      // $router.push('/')
      console.log(error)
    }
  }

  const loadAppData = async () => {
    // app_loading.value = true
    // set(app_loading, true)
    try {
      let currentSession = await useSupabaseClient().auth.getSession()
      console.log(currentSession.data)

      if (currentSession.data.session == null) {
        throw currentSession.error
      } else {
        let {
          data: { user },
        } = await useSupabaseClient().auth.getUser()
        useAppStore().logged = true

        return user
      }
      // let active_profile = await useProfileStore().getUserProfileByUserId(id)
      // useProfileStore().setActiveProfile(active_profile?.data!)

      // let [ann] = await Promise.allSettled([
      // 	useAnnStore().getAnnouncements(),
      // 	useProfileStore().getUserProfiles(),
      // 	active_profile?.data![0].role
      // 		? useRequestStore().getRequestsById(id)
      // 		: useRequestStore().getAllRequests(),
      // 	useDashStore().getSupervisorData(),
      // 	!active_profile?.data![0].role ? useAppStore().getUserSignIns() : null,
      // ])

      // @ts-ignore
      // useAnnStore().setAnnouncements(ann?.value!.data)
      // set(logged, true)
      // set(app_loading, false)
      // logged.value = true;
      // app_loading.value = false;
      // await dailySignIn(role.value)
      // set(app_loading, false)
      // set(logged, false)
      // app_loading.value = false;
      // logged.value = false;
    } catch (error) {
      // $router.push('/')
      console.log(error)
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

  return {
    provide: {
      loadAppData,
      onInitLoadAppData,
      formatDate,
      countries,
    },
  }
})
