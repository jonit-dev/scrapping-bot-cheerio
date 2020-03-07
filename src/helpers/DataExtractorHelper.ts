import { PostBenefits, PostCategory, PostPositionType } from '../types/post.types';


export class DataExtractorHelper {

  public static readBenefits(hasLifeInsurance, hasMealAssistance, hasTransportAssistance, hasHealthPlan, hasDentalPlan): PostBenefits[] {

    let benefits: PostBenefits[] = []

    if (hasLifeInsurance) {
      benefits = [...benefits, PostBenefits.LifeInsurance]
    }
    if (hasMealAssistance) {
      benefits = [...benefits, PostBenefits.FoodTicket]
    }

    if (hasTransportAssistance) {
      benefits = [...benefits, PostBenefits.Transportation]
    }

    if (hasHealthPlan) {
      benefits = [...benefits, PostBenefits.HealthCare]
    }

    if (hasDentalPlan) {
      benefits = [...benefits, PostBenefits.DentalPlan]
    }

    return benefits

  }

  public static readCategory(isTemporary, isCLT, isInternship) {

    if (isCLT) {
      return PostCategory.Job
    }

    if (isTemporary) {
      return PostCategory.Temporary
    }

    if (isInternship) {
      return PostCategory.Internship
    }
    return PostCategory.Job

  }

  public static extractJobData(rawPost) {

    // This function will extract as much data as we can from a raw job post. Unfortunately, it's not able to fill all of the required IPost fields, so you should do some extra checks to do so (like infering the sector and jobRoles)




    let requisites = null
    try {
      requisites = rawPost.match(/(((Pre|Pré)?\-?(Requisitos|Essencial))\:?\n?)\s?(.+\n){1,100}/i)[0].replace(/((Pre|Pré)?\-?Requisitos|Essencial)\:?\n?\s?/i, '').trim()
      // description = post.match(/(Atividades\:?\n?)(.+\n){1,100}/ig)[0]  
    }
    catch (error) {
      requisites = null
    }


    let schedule = null

    try {
      schedule = rawPost.match(/((Horario|horário)\:?\n?)\s?(.+\n){1,100}/i)[0].replace(/(Horario|horário):\n?\s?/i, '').trim()

    }
    catch (error) {
      schedule = null
    }

    let description = null
    try {
      description = rawPost.match(/((Descrição|Descricao|Atividades|Função|Funcao)\:?\n?)\s?(.+\n){1,100}/i)[0].replace(/(Descrição|Descricao|Atividades):\n?\s?/i, '').trim()
      // description = post.match(/(Atividades\:?\n?)(.+\n){1,100}/ig)[0]  
    }
    catch (error) {
      description = null
    }

    let companyName = null;
    try {
      companyName = rawPost.match(/((Empresa):(\n)?)\s?.+(\n)?/ig)[0].replace(/(Empresa):\s?/, '').trim()
    }
    catch (error) {
      companyName = null
    }

    let salary = null
    try {
      salary = (rawPost.match(/((R\$\s)\d+[\.|\,]?\d+)/g) || rawPost.match(/\d+[\.|\,]?\d+[.|,]?\d+\s(reais)/g))[0].replace(/[^0-9]/g, '');
    }
    catch (error) {
      salary = null
    }

    let email = null
    try {
      email = rawPost.match(/\S+@\S+\.\S+/g)[0];
    }
    catch (error) {
      email = null
    }

    let phone = null
    try {
      phone = rawPost.match(/(\(?[1-9]{2}\)?\s?)?9[7-9]{1}[0-9]{3}(-)?\d+/g)[0] || rawPost.match(/\d+\s\d+/ig)[0]
    }
    catch (error) {
      phone = null
    }

    let externalUrl = null
    try {
      externalUrl = rawPost.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ig)[0]
    }
    catch (error) {
      externalUrl = null
    }


    const isPartTime = (/(meio período)/).test(rawPost)
    const isTemporary = (/(Temporario|Temporário)/).test(rawPost)
    const isCLT = (/(CLT|Efetivo|Carteira assinada|Assinado em carteira)/ig).test(rawPost)
    const isInternship = /est(agio|ágio|agiario)/i.test(rawPost)
    const hasLifeInsurance = /(seguro de vida)/i.test(rawPost)
    const hasMealAssistance = /(vale |ticket |Cartão )(alimenta(cao|ção))|(refei(cao|ção))/i.test(rawPost)
    const hasTransportAssistance = /(vale )(transporte)/i.test(rawPost)
    const hasHealthPlan = /(plano de\s|Assistência\s)?(saude|saúde|médica|medica)/i.test(rawPost)
    const hasDentalPlan = /(plano\s|Assistência\s)?(odonto|dent)/i.test(rawPost)
    const isExperienceRequired = /(com\s)?experi(\w+)\s?(necess\w+)?/i.test(rawPost) || /(Necessário)?\s?experi\W+/i.test(rawPost)

    let benefits: PostBenefits[] = DataExtractorHelper.readBenefits(hasLifeInsurance, hasMealAssistance, hasTransportAssistance, hasHealthPlan, hasDentalPlan)

    return {
      category: DataExtractorHelper.readCategory(isTemporary, isCLT, isInternship),
      positionType: isPartTime ? PostPositionType.PartTime : PostPositionType.FullTime,
      benefits,
      content: description,
      email,
      monthlySalary: salary,
      yearlySalary: salary && salary * 12,
      hourlySalary: salary && salary / 1920,
      experienceRequired: isExperienceRequired,
      externalUrl,
      phone,
      requisites,
      schedule,
      companyName
    }











  }


}




