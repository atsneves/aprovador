var databaseURL = ("mongodb://localhost/aprovador");
var mongoose = require("mongoose");
mongoose.connect(databaseURL);
Schema = mongoose.Schema;

///Cria a tabela de administrador

var TABLE_XML = "Xml";
var TABLE_XMLCRYPT = "XmlCrypt";
var TABLE_RESPOSTA = "Resposta";
var TABLE_EMPRESA = "Empresa";
var TABLE_CADASTRO = "Cadastro";
var TABLE_DEVICE = "Device";
var TABLE_LOG_EROO = "Erro";


var enumTipo = ["ADMIN_EMPRESA","ADMIN_GERAL", "USER"];
var enumSituacao = ["INATIVO", "ATIVO"];

var enumTipoLog = ["ERRO", "NOERRO"];


var EmpresaSchema = new Schema({
	nome:{type:String,required:true,unique:true},
	descricao:{type:String},
	situacao: {type: String, required: true, enum: enumSituacao,default:"ATIVO"},
	data_inicio: {type: Date,default: Date.now},
	data_termino: {type: Date,default: Date.now}
});

var CadastroSchema = new Schema({
	nome:{type:String,required:true},
	usuario: {type:String,required:true,unique: true},
	senha: {type:String,required:true},
	cod_usuario: {type:String},
	id_empresa:{type:String},
	tipo: {type: String, required: true, enum: enumTipo},
	situacao: {type: String, required: true, enum: enumSituacao,default:"INATIVO"},
	device_id:{type:String},
	token_ativacao:{type:String},
	data_inicio: {type: Date,default: Date.now},
	data_termino: {type: Date,default: Date.now}
});

var DeviceSchema = new Schema({
	udid: {type: String, required:true,unique: true},
	device: {type:String, required:true},
	version:{type:String, required:true}
});

var XMLSchema = new Schema({
	id_sistema:{type:String,required:true},
	email: {type:String,required:true},
	titulo: {type:String,required:true},
	tipo_aprovacao: {type:String,required:true},
	dados_criptografados: {type:String,required:true},
	prioridade: {type:String},
	id_xml_enviado: {type:String},
	data: {type: String}
});


var XMLCryptSchema = new Schema({
	dados_criptografados: {type:String,required:true},
	id_xml:{type:String,required:true}
});

var RespostaSchema = new Schema ({
	id_sistema:{type:String,required:true},
	dados_criptografados: {type:String,required:true},
	id_xml:{type:String,required:true}
});


var LogErroSchema = new Schema ({
	ip:{type:String,required:true},
	mensagem: {type:String,required:true},
	tipo: {type: String, required: true, enum: enumTipoLog,default:"NOERRO"},
	data: {type: Date,default: Date.now}
});


mongoose.model(TABLE_LOG_EROO, LogErroSchema);
exports.LogErro = mongoose.model(TABLE_LOG_EROO);



mongoose.model(TABLE_EMPRESA, EmpresaSchema);
exports.Empresa = mongoose.model(TABLE_EMPRESA);


mongoose.model(TABLE_CADASTRO, CadastroSchema);
exports.Cadastro = mongoose.model(TABLE_CADASTRO);

mongoose.model(TABLE_XML, XMLSchema);
exports.Xmls = mongoose.model(TABLE_XML);

mongoose.model(TABLE_XMLCRYPT, XMLCryptSchema);
exports.XmlCrypt = mongoose.model(TABLE_XMLCRYPT);


mongoose.model(TABLE_DEVICE, DeviceSchema);
exports.Device = mongoose.model(TABLE_DEVICE);

mongoose.model(TABLE_RESPOSTA, RespostaSchema);
exports.Resposta = mongoose.model(TABLE_RESPOSTA);
