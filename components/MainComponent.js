import React, { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import Dishdetail from "./DishdetailComponent";
import { View, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const HomeNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const MenuNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer() {
	return (
		<MainNavigator.Navigator drawerStyle={{ backgroundColor: "#D1C4E9" }}>
			<MainNavigator.Screen
				name="Home"
				component={HomeNavigatorScreen}
				options={{ title: "Home" }}
			/>
			<MainNavigator.Screen
				name="About"
				component={AboutNavigatorScreen}
				options={{ title: "About Us" }}
			/>
			<MainNavigator.Screen
				name="Menu"
				component={MenuNavigatorScreen}
				options={{ title: "Menu" }}
			/>
			<MainNavigator.Screen
				name="Contact"
				component={ContactNavigatorScreen}
				options={{ title: "Contact Us" }}
			/>
		</MainNavigator.Navigator>
	);
}

function MenuNavigatorScreen() {
	return (
		<MenuNavigator.Navigator
			initialRouteName="Menu"
			screenOptions={{
				headerStyle: {
					backgroundColor: "#512DA8",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					color: "#fff",
				},
			}}
		>
			<MenuNavigator.Screen name="Menu" component={Menu} />
			<MenuNavigator.Screen
				name="Dishdetail"
				component={Dishdetail}
				options={{ headerTitle: "Dish Detail" }}
			/>
		</MenuNavigator.Navigator>
	);
}

function HomeNavigatorScreen() {
	return (
		<HomeNavigator.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerStyle: {
					backgroundColor: "#512DA8",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					color: "#fff",
				},
			}}
		>
			<HomeNavigator.Screen name="Home" component={Home} />
		</HomeNavigator.Navigator>
	);
}

function AboutNavigatorScreen() {
	return (
		<AboutNavigator.Navigator
			initialRouteName="About"
			screenOptions={{
				headerStyle: {
					backgroundColor: "#512DA8",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					color: "#fff",
				},
			}}
		>
			<AboutNavigator.Screen name="About Us" component={About} />
		</AboutNavigator.Navigator>
	);
}

function ContactNavigatorScreen() {
	return (
		<ContactNavigator.Navigator
			initialRouteName="Contact"
			screenOptions={{
				headerStyle: {
					backgroundColor: "#512DA8",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					color: "#fff",
				},
			}}
		>
			<ContactNavigator.Screen name="Contact Us" component={Contact} />
		</ContactNavigator.Navigator>
	);
}

class Main extends Component {
	render() {
		return (
			<View
				style={{
					flex: 1,
					paddingTop: Platform.OS === "android" ? 0 : StatusBar.currentHeight,
				}}
			>
				<NavigationContainer>
					<MainNavigatorDrawer />
				</NavigationContainer>
			</View>
		);
	}
}
export default Main;
