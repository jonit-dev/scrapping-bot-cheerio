

export class DataExtractorHelper {

  public static extractJobData(post) {

    let requisites = null
    try {
      requisites = post.match(/(((Pre|Pré)?\-?(Requisitos|Essencial))\:?\n?)\s?(.+\n){1,100}/i)[0].replace(/((Pre|Pré)?\-?Requisitos|Essencial)\:?\n?\s?/i, '').trim()
      // description = post.match(/(Atividades\:?\n?)(.+\n){1,100}/ig)[0]  
    }
    catch (error) {
      requisites = null
    }


    let schedule = null

    try {
      schedule = post.match(/((Horario|horário)\:?\n?)\s?(.+\n){1,100}/i)[0].replace(/(Horario|horário):\n?\s?/i, '').trim()

    }
    catch (error) {
      schedule = null
    }

    let description = null
    try {
      description = post.match(/((Descrição|Descricao|Atividades|Função|Funcao)\:?\n?)\s?(.+\n){1,100}/i)[0].replace(/(Descrição|Descricao|Atividades):\n?\s?/i, '').trim()
      // description = post.match(/(Atividades\:?\n?)(.+\n){1,100}/ig)[0]  
    }
    catch (error) {
      description = null
    }

    let companyName = null;
    try {
      companyName = post.match(/((Empresa):(\n)?)\s?.+(\n)?/ig)[0].replace(/(Empresa):\s?/, '').trim()
    }
    catch (error) {
      companyName = null
    }

    let salary = null
    try {
      salary = (post.match(/((R\$\s)\d+[\.|\,]?\d+)/g) || post.match(/\d+[\.|\,]?\d+[.|,]?\d+\s(reais)/g))[0].replace(/[^0-9]/g, '');
    }
    catch (error) {
      salary = null
    }

    let email = null
    try {
      email = post.match(/\S+@\S+\.\S+/g)[0];
    }
    catch (error) {
      email = null
    }

    let phone = null
    try {
      phone = post.match(/(\(?[1-9]{2}\)?\s?)?9[7-9]{1}[0-9]{3}(-)?\d+/g)[0] || post.match(/\d+\s\d+/ig)[0]
    }
    catch (error) {
      phone = null
    }

    let postUrl = null
    try {
      postUrl = post.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ig)[0]
    }
    catch (error) {
      postUrl = null
    }


    const isTemporary = (/(Temporario|Temporário)/).test(post)
    const isCLT = (/(CLT|Efetivo|Carteira assinada|Assinado em carteira)/ig).test(post)
    const isInternship = /est(agio|ágio|agiario)/i.test(post)
    const hasLifeInsurance = /(seguro de vida)/i.test(post)
    const hasMealAssistance = /(vale|ticket|Cartão )(alimenta(cao|ção))|(refei(cao|ção))/i.test(post)
    const hasTransportAssistance = /(vale )(transporte)/i.test(post)
    const hasHealthPlan = /(plano de\s|Assistência\s)?(saude|saúde|médica|medica)/i.test(post)
    const hasDentalPlan = /(plano\s|Assistência\s)?(odonto|dent)/i.test(post)
    const isExperienceRequired = /(com\s)?experi(\w+)\s?(necess\w+)?/i.test(post) || /(Necessário)?\s?experi\W+/i.test(post)

    const output = {
      schedule,
      postUrl, requisites, hasLifeInsurance, isTemporary, companyName, description, isCLT, salary, hasDentalPlan, hasHealthPlan, isExperienceRequired, hasMealAssistance, hasTransportAssistance, isInternship, phone, email
    }






  }


}