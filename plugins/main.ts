import "v-calendar/style.css";
import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import { useAppStore } from "@/store/app";
import { useAnnStore } from "@/store/announce";
import { useRequestStore } from "@/store/requests";
import { Applicant } from "interfaces/interfaces";
import { useTasksStore } from "@/store/tasks";
import { useProfileStore } from "@/store/profile";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "animate.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(setupCalendar, {});
  nuxtApp.vueApp.component("VCalendar", Calendar);
  nuxtApp.vueApp.component("DatePicker", DatePicker);
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);

  function formatDateWords(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const ordinalSuffix = getOrdinalSuffix(day);
    const formattedDate = `${day}${ordinalSuffix} ${month}, ${year}`;

    return formattedDate;
  }

  function formatDateTime(date: Date) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  function getOrdinalSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return "th";
    }

    const lastDigit = day % 10;

    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const formatDate = (date: Date | null) => {
    if (date == null) {
      return "";
    } else {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear());

      return `${day}/${month}/${year}`;
    }
  };

  function replaceWardWithImagePaths(
    wardArray: string[],
    imagePathsArray: string[],
  ): string[] {
    return wardArray.map((ward) => {
      const matchingPath = imagePathsArray.find((path) =>
        path.includes(ward + ".jpg"),
      );
      return matchingPath ? matchingPath : ward;
    });
  }

  // function deepCompareObjects<T>(obj1: T, obj2: T) {
  //   const differences: any[] = [];

  //   function compareRecursive(o1: any, o2: any, currentKey = "") {
  //     for (const key in o1) {
  //       if (o1.hasOwnProperty(key) && o2.hasOwnProperty(key)) {
  //         const newKey = currentKey ? `${currentKey}.${key}` : key;

  //         if (typeof o1[key] === "object" && typeof o2[key] === "object") {
  //           compareRecursive(o1[key], o2[key], newKey);
  //         } else if (o1[key] !== o2[key]) {
  //           differences.push({
  //             key: newKey,
  //             value1: o1[key],
  //             value2: o2[key],
  //           });
  //         }
  //       }
  //     }
  //   }

  //   compareRecursive(obj1, obj2);
  //   return differences;
  // }

  function deepCompareObjects<T extends Record<string, any>>(obj1: T, obj2: T) {
    interface Difference {
      key: string;
      value1: any;
      value2: any;
    }

    const differences: Difference[] = [];

    function compareRecursive(o1: any, o2: any, currentKey = "") {
      for (const key in o1) {
        if (o1.hasOwnProperty(key) && o2.hasOwnProperty(key)) {
          const newKey = currentKey ? `${currentKey}.${key}` : key;

          if (typeof o1[key] === "object" && typeof o2[key] === "object") {
            compareRecursive(o1[key], o2[key], newKey);
          } else if (o1[key] !== o2[key]) {
            differences.push({
              key: newKey,
              value1: o1[key],
              value2: o2[key],
            });
          }
        }
      }
    }

    compareRecursive(obj1, obj2);

    return differences;
  }

  function extractNumFromPhrase(phrase: string): number | null {
    const regex = /ward(\d+)/; // Matches "ward" followed by one or more digits
    const match = phrase.match(regex);

    if (match && match[1]) {
      return parseInt(match[1], 10);
    } else {
      return null;
    }
  }

  function sortByRecency(apls: Applicant[]): Applicant[] {
    return apls.sort(
      (a, b) =>
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime(),
    );
  }

  function calculateHoursPassed(date: string): number {
    // Calculate the number of hours passed in a day and round off to no decimals
    const startOfDay = new Date(date); // Create a copy of the current date
    startOfDay.setHours(0, 0, 0, 0); // Set the time to the start of the day (00:00:00)

    const hoursPassed = Math.floor(
      (new Date(date).getTime() - startOfDay.getTime()) / (1000 * 60 * 60),
    );

    return hoursPassed;
  }

  function sortArrayByWardNumber(arr: string[]): string[] {
    // Custom sorting function
    function compareByWardNumber(a: string, b: string): number {
      console.log(a, b);
      if (a == null) {
        const numB = parseInt(b.match(/ward(\d+)/)?.[1] || "0");
        return numB;
      } else {
        const numA = parseInt(a.match(/ward(\d+)/)?.[1] || "0");
        const numB = parseInt(b.match(/ward(\d+)/)?.[1] || "0");
        return numA - numB;
      }
    }

    // Use the custom sorting function to sort the array
    return arr.slice().sort(compareByWardNumber);
  }

  function trimStringProperties(obj: any): any {
    return obj;
  }

  const mobileCheck = () => {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a,
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4),
        )
      )
        check = true;
    })(navigator.userAgent);
    return check;
  };

  const marital_status = [
    "UNMARRIED",
    "MARRIED",
    "DIVORCED",
    "WIDOWED",
    "LEGALLY SEPARATED",
  ];
  const highest_level_ed = [
    "PRIMARY SCHOOL ONLY",
    "HIGH SCHOOL, NO DEGREE",
    "HIGH SCHOOL DEGREE",
    "VOCATIONAL SCHOOL",
    "SOME UNIVERSITY COURSES",
    "UNIVERSITY DEGREE",
    "SOME GRADUATE LEVEL COURSES",
    "MASTER'S DEGREE",
    "SOME DOCTORATE LEVEL COURSES",
    "DOCTORATE DEGREE",
  ];

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo, Democratic Republic of the",
    "Congo, Republic of the",
    "Costa Rica",
    "Cote d'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor (Timor-Leste)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia (formerly Macedonia)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  return {
    provide: {
      deepCompareObjects,
      formatDate,
      formatDateTime,
      formatDateWords,
      countries,
      extractNumFromPhrase,
      replaceWardWithImagePaths,
      sortByRecency,
      calculateHoursPassed,
      sortArrayByWardNumber,
      trimStringProperties,
      mobileCheck,
      marital_status,
      highest_level_ed,
    },
  };
});
