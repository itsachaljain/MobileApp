import React, { Component } from "react";
import { Text, FlatList, View } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

class Contact extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ScrollView>
				<Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
					<Card title="Contact Information">
						<Text>121, Clear Water Bay Road</Text>
						<Text> </Text>
						<Text>Clear Water Bay, Kowloon</Text>
						<Text> </Text>
						<Text>HONG KONG</Text>
						<Text> </Text>
						<Text>Tel: +852 1234 5678</Text>
						<Text> </Text>
						<Text>Fax: +852 8765 4321</Text>
						<Text> </Text>
						<Text>Email:confusion@food.net</Text>
					</Card>
				</Animatable.View>
			</ScrollView>
		);
	}
}
export default Contact;
