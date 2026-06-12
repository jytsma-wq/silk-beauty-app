import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { I18nextProvider } from 'react-i18next';
import {
  CalendarDays,
  Gem,
  Globe2,
  Home,
  Info,
  Sparkles,
  Users,
} from 'lucide-react-native';
import { LocaleProvider, useLocale } from './src/i18n/LocaleProvider';
import { i18n } from './src/i18n';
import { label } from './src/data/labels';
import { BookingScreen } from './src/screens/BookingScreen';
import { ConditionsScreen } from './src/screens/ConditionsScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { InternationalScreen } from './src/screens/InternationalScreen';
import { MoreScreen } from './src/screens/MoreScreen';
import { TeamScreen } from './src/screens/TeamScreen';
import { TreatmentDetailScreen } from './src/screens/TreatmentDetailScreen';
import { TreatmentsScreen } from './src/screens/TreatmentsScreen';
import { colors } from './src/theme';
import type { RootTabParamList, TreatmentsStackParamList } from './src/types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const TreatmentsStack = createNativeStackNavigator<TreatmentsStackParamList>();

function TreatmentsStackScreen() {
  const { locale } = useLocale();

  return (
    <TreatmentsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.ivory },
        headerTitleStyle: { color: colors.ink },
        headerTintColor: colors.tealDark,
        contentStyle: { backgroundColor: colors.ivory },
      }}
    >
      <TreatmentsStack.Screen name="Treatments" component={TreatmentsScreen} options={{ title: label(locale, 'treatments') }} />
      <TreatmentsStack.Screen name="TreatmentDetail" component={TreatmentDetailScreen} options={{ title: label(locale, 'details') }} />
    </TreatmentsStack.Navigator>
  );
}

function tabIcon(routeName: keyof RootTabParamList, color: string, size: number) {
  const props = { color, size, strokeWidth: 2.4 };
  switch (routeName) {
    case 'Home':
      return <Home {...props} />;
    case 'TreatmentsTab':
      return <Sparkles {...props} />;
    case 'Conditions':
      return <Gem {...props} />;
    case 'Team':
      return <Users {...props} />;
    case 'International':
      return <Globe2 {...props} />;
    case 'Booking':
      return <CalendarDays {...props} />;
    case 'More':
      return <Info {...props} />;
    default:
      return <Home {...props} />;
  }
}

function AppTabs() {
  const { locale } = useLocale();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.ivory },
        headerTitleStyle: { color: colors.ink },
        headerTintColor: colors.tealDark,
        tabBarActiveTintColor: colors.tealDark,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.paper,
          borderTopColor: colors.line,
          minHeight: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '800',
        },
        tabBarIcon: ({ color, size }) => tabIcon(route.name, color, size),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Silk', tabBarLabel: label(locale, 'more') === 'More' ? 'Home' : 'Home' }} />
      <Tab.Screen name="TreatmentsTab" component={TreatmentsStackScreen} options={{ title: label(locale, 'treatments'), tabBarLabel: label(locale, 'treatments'), headerShown: false }} />
      <Tab.Screen name="Conditions" component={ConditionsScreen} options={{ title: label(locale, 'conditions'), tabBarLabel: label(locale, 'conditions') }} />
      <Tab.Screen name="Team" component={TeamScreen} options={{ title: label(locale, 'team'), tabBarLabel: label(locale, 'team') }} />
      <Tab.Screen name="International" component={InternationalScreen} options={{ title: label(locale, 'international'), tabBarLabel: label(locale, 'international') }} />
      <Tab.Screen name="Booking" component={BookingScreen} options={{ title: label(locale, 'booking'), tabBarLabel: label(locale, 'booking') }} />
      <Tab.Screen name="More" component={MoreScreen} options={{ title: label(locale, 'more'), tabBarLabel: label(locale, 'more') }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <I18nextProvider i18n={i18n}>
          <LocaleProvider>
            <NavigationContainer>
              <AppTabs />
            </NavigationContainer>
            <StatusBar style="dark" />
          </LocaleProvider>
        </I18nextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
