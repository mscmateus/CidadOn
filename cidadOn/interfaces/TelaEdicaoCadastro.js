import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import {modificaEdiNome,
	modificaEdiSobrenome,
	modificaEdiCpf, 
	modificaEdiEmail,
	modificaEdiNomeUsuario, 
	modificaEdiSenha,
	modificaEdiSenha2,
	limpaDadosUsuario,
	igualaDadosEdicao,
	verificaEdicaoCadastro
} from '../actions/UsuarioActions'
import { connect } from 'react-redux';

class TelaEdicaoCadastro extends React.Component {
	constructor(props){
		super(props)
		this.props.igualaDadosEdicao()
	}
	_verificaCadastro(){
		const {email, senha, ediNome, rdiSobrenome,ediCpf,ediEmail,ediNomeUsuario, ediSenha, ediSenha2} = this.props;
		this.props.verificaEdicaoCadastro({email, senha, ediNome, rdiSobrenome,ediCpf,ediEmail,ediNomeUsuario,ediSenha, ediSenha2});
	}
	render() {
		return (
			<ScrollView>
				<View style={{ padding: 20 }}>
					<View style={styles.formularioLogin}>
						<Text style={{ fontSize: 20, textAlign: 'center' }}>Ok, errou alguma coisa?</Text>
						<TextInput value={this.props.ediNome} style={styles.entrada} placeholder="Nome" onChangeText={texto => this.props.modificaEdiNome(texto)}/>
						<TextInput value={this.props.ediSobrenome} style={styles.entrada} placeholder="Sobrenome" onChangeText={texto => this.props.modificaEdiCpf(texto)}/>
						<TextInput value={this.props.ediCpf} style={styles.entrada} placeht value={this.props.ediEmail} style={styles.entrada} placeholder="E-mail" onChangeText={texto => this.props.modificaEdiEmail(texto)}/>
						<TextInput value={this.props.ediEmail} style={styles.entrada} placeholder="E-mail" onChangeText={texto => this.props.modificaEdiEmail(texto)}/>
						<TextInput value={this.props.ediNomeUsuario} style={styles.entrada} placeholder="Nome de usuário" onChangeText={texto => this.props.modificaEdiNomeUsuario(texto)}/>
						<TextInput value={this.props.ediSenha} secureTextEntry={true} style={styles.entrada} placeholder="Senha" onChangeText={texto => this.props.modificaEdiSenha(texto)}/>
						<TextInput value={this.props.ediSenha2} secureTextEntry={true} style={styles.entrada} placeholder="Confirme a senha" onChangeText={texto => this.props.modificaEdiSenha2(texto)}/>
						<TouchableOpacity style={styles.btn} onPress={() => { this._verificaCadastro()}}>
							<Text style={{ fontSize: 20, color: '#FFFFFF', }}>Continuar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	formularioLogin: {
		marginTop: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btn: {
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
		marginTop: 20,
		height: 60,
		width: 150,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1d9a78',
	},
	entrada: {
		textAlign: 'center',
		padding: 5,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomColor: '#000',
		borderTopColor: '#000',
		borderLeftColor: '#000',
		borderRightColor: '#000',
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		marginTop: 10,
		fontSize: 20,
		height: 45,
		width: 250
	}
});

const mapStateToProps = state => (
	{
		email: state.UsuarioReducer.email,
		senha: state.UsuarioReducer.senha,
		//edicao
		ediNome: state.UsuarioReducer.ediNome,
		ediSobrenome: state.UsuarioReducer.ediSobrenome,
		ediCpf: state.UsuarioReducer.ediCpf,
		ediEmail: state.UsuarioReducer.ediEmail,
		ediNomeUsuario: state.UsuarioReducer.ediNomeUsuario,
		ediSenha: state.UsuarioReducer.ediSenha,
		ediSenha2: state.UsuarioReducer.ediSenha2
	}
)
export default connect(mapStateToProps, {modificaEdiNome,
	modificaEdiSobrenome,
	modificaEdiCpf, 
	modificaEdiEmail,
	modificaEdiNomeUsuario, 
	modificaEdiSenha,
	modificaEdiSenha2,
	limpaDadosUsuario,
	igualaDadosEdicao,
	verificaEdicaoCadastro
})(TelaEdicaoCadastro);