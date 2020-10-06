import React, { Component } from "react";
import { View, Text, Modal, StyleSheet, Button } from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		favorites: state.favorites,
	};
};

const mapDispatchToProps = (dispatch) => ({
	postFavorite: (dishId) => dispatch(postFavorite(dishId)),
	postComment: (dishId, rating, author, comment) =>
		dispatch(postComment(dishId, rating, author, comment)),
});

function RenderDish(props) {
	const dish = props.dish;

	if (dish != null) {
		return (
			<Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
				<Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
					<Text style={{ margin: 10 }}>{dish.description}</Text>
					<View style={styles.Icons}>
						<Icon
							raised
							reverse
							name={props.favorite ? "heart" : "heart-o"}
							type="font-awesome"
							color="#f50"
							onPress={() =>
								props.favorite
									? console.log("Already Favorite")
									: props.onPress()
							}
						/>
						<Icon
							raised
							reverse
							name="pencil"
							type="font-awesome"
							color="#512DA8"
							onPress={() => props.toggleModal()}
						/>
					</View>
				</Card>
			</Animatable.View>
		);
	} else {
		return <View></View>;
	}
}

function RenderComments(props) {
	const comments = props.comments;

	const RenderCommentItem = ({ item, index }) => {
		return (
			<View key={index} style={{ margin: 10 }}>
				<Text style={{ fontSize: 14 }}>{item.comment}</Text>
				<Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
				<Text style={{ fontSize: 12 }}>
					{"-- " + item.author + ", " + item.date}
				</Text>
			</View>
		);
	};
	return (
		<Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
			<Card title="Comments">
				<FlatList
					data={comments}
					renderItem={RenderCommentItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			</Card>
		</Animatable.View>
	);
}

class Dishdetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 1,
			author: "",
			comment: "",
			showModal: false,
		};
	}

	toggleModal() {
		this.setState({ showModal: !this.state.showModal });
	}

	resetForm() {
		this.setState({
			rating: 1,
			author: "",
			comment: "",
		});
	}

	markFavorite(dishId) {
		this.props.postFavorite(dishId);
	}

	handleComment(dishId) {
		this.props.postComment(
			dishId,
			this.state.rating,
			this.state.author,
			this.state.comment
		);
		this.resetForm();
	}

	render() {
		const dishId = this.props.route.params.dishId;

		return (
			<ScrollView>
				<RenderDish
					dish={this.props.dishes.dishes[+dishId]}
					favorite={this.props.favorites.some((el) => el === dishId)}
					onPress={() => this.markFavorite(dishId)}
					toggleModal={() => this.toggleModal()}
				/>

				<Modal
					animationType={"slide"}
					transparent={false}
					visible={this.state.showModal}
					onDismiss={() => {
						this.resetForm();
						this.toggleModal();
					}}
					onRequestClose={() => {
						this.resetForm();
						this.toggleModal();
					}}
				>
					<View style={styles.modal}>
						<Rating
							showRating
							startingValue={1}
							ratingCount={5}
							onFinishRating={(rating) => this.setState({ rating: rating })}
						/>
						<Input
							margin={10}
							placeholder="Author"
							leftIcon={<Icon type="font-awesome" name="user-o" />}
							onChangeText={(author) => this.setState({ author: author })}
						/>
						<Input
							placeholder="Comment"
							leftIcon={<Icon type="font-awesome" name="comment-o" />}
							onChangeText={(comment) => this.setState({ comment: comment })}
						/>
						<Button
							color="#512DA8"
							title="Submit"
							onPress={() => {
								this.handleComment(dishId);
								this.toggleModal();
							}}
						/>
						<Text margin={20}></Text>
						<Button
							color="#808080"
							title="Cancel"
							onPress={() => {
								this.resetForm();
								this.toggleModal();
							}}
						/>
					</View>
				</Modal>
				<RenderComments
					comments={this.props.comments.comments.filter(
						(comment) => comment.dishId === dishId
					)}
				/>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	Icons: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		flexDirection: "row",
	},
	modal: {
		justifyContent: "center",
		margin: 20,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
