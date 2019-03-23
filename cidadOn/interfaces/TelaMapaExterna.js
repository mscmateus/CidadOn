import React from 'react';
import { StyleSheet, View, Alert, TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { modificaLocalizacao, recuperaTodosOsProblemas, recuperaProblema, recuperaTiposDeProblemas } from '../actions/ProblemaActions'
import {colors } from '../layout';
import BotaoLocalizacao from '../components/BotaoLocalizacao'

class TelaMapaExterna extends React.Component {
	geolocalizar() {
		navigator.geolocation.getCurrentPosition(
			position => {
				//const location = JSON.stringify(position);
				this.setState({
					region: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}
				})
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}
	constructor(props) {
		super(props);
		this.props.recuperaTiposDeProblemas()
		this.props.recuperaTodosOsProblemas()
		this.state = {
			marcaFeita: false,
			cordenadaPonto: { latitude: null, longitude: null },
			region: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 12,
				longitudeDelta: 12,
			},
			butaoDesabilitado: true
		};
	}
	pegaIcone(idTipo) {
		for (let i = 0; i < this.props.tiposDeProblemas.length; i++) {
			if (this.props.tiposDeProblemas[i].id == idTipo) {
				return { uri: this.props.tiposDeProblemas[i].icone }
			}
		}
	}
	render() {
		return (
			<View>
				<View style={styles.container}>
					<MapView
						showsMyLocationButton={false}
						showsUserLocation={true}
						provider={PROVIDER_GOOGLE} // remove if not using Google Maps
						style={styles.map}
						region={this.state.region}
					>
						{this.props.problemas.map(problema => (
							<Marker
								onPress={() => {
									this.props.recuperaProblema(problema.id)
								}}
								image={this.pegaIcone(problema.tipoDeProblemaId)}
								coordinate={problema.localizacao}
							/>
						))}
					</MapView>
				</View>
				<BotaoLocalizacao onPress={()=>{this.geolocalizar()}}/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		height: '100%',
		width: '100%',
	}
});
const mapStateToProps = state => (
	{
		localizacao: state.ProblemaReducer.localizacao,
		problemas: state.ProblemaReducer.problemas,
		tiposDeProblemas: state.ProblemaReducer.tiposDeProblemas
	}
)
export default connect(mapStateToProps, { modificaLocalizacao, recuperaTodosOsProblemas, recuperaProblema, recuperaTiposDeProblemas })(TelaMapaExterna);