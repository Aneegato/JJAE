import axios from "axios";

const BASE_URL = 'http://localhost:3001/api';

export async function calculateRisk(routeData, weatherData) {
    console.log("reached calculateRisk");
    try {
      const prompt = `
        You are an AI risk assessment expert. Based on the provided route information and weather data, assess the risks associated with the transportation of goods via the Port of Singapore Authority (PSA). You should evaluate each factor listed below, and return a risk score between 0 and 100 for each factor.

        The factors to consider are:

        1. **Geopolitical Stability**: The political stability of countries along the route and at the destination.
        2. **Weather Conditions**: The likelihood of extreme weather events affecting the sea and land routes.
        3. **Piracy Threats**: The threat of piracy in sea routes, especially in high-risk areas like the Strait of Malacca.
        4. **Port Congestion**: The risk of delays due to congestion at the Port of Singapore or other ports.
        5. **Port Handling Quality**: The efficiency and safety of cargo handling at the ports involved.
        6. **Customs Regulations**: The complexity of customs paperwork and the risk of compliance issues in the country of destination.
        7. **Trade Restrictions**: The risk of tariffs, embargoes, or sanctions affecting the cargo.
        8. **Carrier Reliability**: The reliability of the logistics provider in terms of timeliness and cargo safety.
        9. **Labor Strikes**: The risk of delays due to labor disputes at ports.

        ### Route Information:
        ${JSON.stringify(routeData, null, 2)}

        ### Weather Data:
        ${JSON.stringify(weatherData, null, 2)}

        ### Risk Assessment:
        Please return the result in the following JSON format, with a risk score for each factor between 0 and 100, as well as an overall risk score:

        {
          "overall_risk": <overall risk score between 0 and 100>,
          "factors": {
            "geopolitical_stability": <risk score for geopolitical stability>,
            "weather_conditions": <risk score for weather conditions>,
            "piracy_threats": <risk score for piracy threats>,
            "port_congestion": <risk score for port congestion>,
            "port_handling_quality": <risk score for port handling quality>,
            "customs_regulations": <risk score for customs regulations>,
            "trade_restrictions": <risk score for trade restrictions>,
            "carrier_reliability": <risk score for carrier reliability>,
            "labor_strikes": <risk score for labor strikes>
          }
        }

        Please follow this format strictly and do not add additional explanations.
        `;
  
      const response = await axios.post(`${BASE_URL}/risk-calculation`, { prompt });
      const riskAssessment = response.data.risk
      console.log("Full response from API:", response.data);
      return riskAssessment;
  
    } catch (error) {
      console.error("Error generating risk Assessment:", error);
      throw new Error("Failed to calculate risk.");
    }
  }