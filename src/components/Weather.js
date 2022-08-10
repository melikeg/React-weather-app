import { useWeather } from "../context/WeatherContext";
import { useTheme } from "../context/ThemeContext";

function Weather() {
  const { cities, selected, setSelected, weathers, unit, setUnit } =
    useWeather();
  const { theme, setTheme } = useTheme();

  const handleChange = (e) => {
    const newValue = e.target.value.split(",");
    setSelected({
      id: newValue[0],
      name: newValue[1],
      latitude: newValue[2],
      longitude: newValue[3],
      population: newValue[4],
      region: newValue[5],
    });
  };
  const dt = weathers?.current?.dt;
  const day = new Date(dt * 1000);

  function createDate(dt, type) {
    var day = new Date(dt * 1000);
    if (type === "long") {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return day.toLocaleString("en-us", options); // Friday, January 15, 2021
    } else {
      return day.toLocaleString("en-us", { weekday: "long" }); // Friday
    }
  }
  function convertTime(sun, timezone) {
    let dt = new Date((sun + timezone) * 1000);
    let h = dt.getHours();
    let m = "0" + dt.getMinutes();
    let t = h + ":" + m.substr(-2);
    return t;
  }

  return (
    <div className="main">
      <header>
        <div>
          <select
            onChange={handleChange}
            className={`city_select_input ${theme}`}
          >
            {cities.map((city) => (
              <option
                key={city.id}
                value={[
                  city.id,
                  city.name,
                  city.latitude,
                  city.longitude,
                  city.population,
                  city.region,
                ]}
              >
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2 className={`title_color  ${theme}`}>Weather App</h2>
        </div>
        <div className="buttons">
          <span onClick={() => setTheme(theme === "Dark" ? "Light" : "Dark")}>
            {theme === "Dark" ? (
              <span className="material-symbols-outlined mode">light_mode</span>
            ) : (
              <span className="material-symbols-outlined mode">dark_mode</span>
            )}
          </span>

          <span className="degree_unit">
            <span>C</span>
            <span
              onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
            >
              {unit === "metric" ? (
                <span className="material-symbols-outlined toggle">
                  toggle_off
                </span>
              ) : (
                <span className="material-symbols-outlined toggle">
                  toggle_on
                </span>
              )}
            </span>
            <span>F</span>
          </span>

          <span>
            <a href="https://github.com/melikeg/React-weather-app">
              <i className="fa-brands fa-github fa-xl"></i>
            </a>
          </span>
        </div>
      </header>
      <div className="container">
        <aside className={`${theme}`}>
          <div className="aside-header">
            <h1 className={`${theme}`}>{selected.name}</h1>
          </div>
          <div className="aside-container">
            <img
              alt="weather icon"
              src={
                weathers?.current?.weather?.[0].icon &&
                `http://openweathermap.org/img/wn/${weathers?.current?.weather?.[0].icon}@2x.png`
              }
            />
            <span>{weathers?.current?.weather?.[0].description}</span>

            <div className={`date ${theme}`}>
              <div>{createDate(dt)}</div>
              <div>{day.toDateString().slice(3)}</div>
            </div>
            <h1 className={`${theme}`}>{weathers?.current?.temp} &#176;</h1>
          </div>
          <div className="aside-footer">
            <div>
              <span>Feels Like</span>
              <span>{weathers?.current?.feels_like}</span>
            </div>
            <div>
              <span>Humidity</span>
              <span>{weathers?.current?.humidity} %</span>
            </div>
            <div>
              <span>Wind Speed</span>
              <span>{weathers?.current?.wind_speed}</span>
            </div>
          </div>
        </aside>
        <section>
          <div className={`section-item ${theme}`}>
            <h3>Humidity</h3>
            <div className="item-align">
              <div>
                <span className="material-symbols-outlined drop">
                  humidity_high
                </span>
              </div>
              <div className="section-item-font">
                {weathers?.current?.humidity} %
              </div>
            </div>
          </div>
          <div className={`section-item ${theme}`}>
            <h3>Day & Night</h3>
            <div className="item-align">
              <div className="item">
                <div>
                  <span className="material-symbols-outlined temp">
                    device_thermostat
                  </span>
                  <span className="material-symbols-outlined arrow_up">
                    arrow_upward
                  </span>
                </div>
                <span className="item_font">
                  {weathers?.daily?.[0]?.temp?.day} &#176;
                </span>
              </div>
              <div className="item">
                <div>
                  <span className="material-symbols-outlined temp">
                    device_thermostat
                  </span>
                  <span className="material-symbols-outlined arrow_down">
                    arrow_downward
                  </span>
                </div>
                <span className="item_font">
                  {weathers?.daily?.[0]?.temp?.night} &#176;
                </span>
              </div>
            </div>
          </div>
          <div className={`section-item ${theme}`}>
            <h3>Sunrise & Sunset</h3>
            <div className="item-align">
              <div className="item suns">
                <span className="material-symbols-outlined sun">wb_sunny</span>
                <span className="item_font">
                  {convertTime(
                    weathers?.current?.sunrise,
                    weathers?.timezone_offset
                  )}
                </span>
              </div>
              <div className="item suns">
                <span className="material-symbols-outlined sun">
                  wb_twilight
                </span>
                <span className="item_font">
                  {convertTime(
                    weathers?.current?.sunset,
                    weathers?.timezone_offset
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className={`section-item ${theme}`}>
            <h3>Wind Speed & Degree</h3>
            <div className="item-align">
              <div className="item suns">
                <span className="material-symbols-outlined wind-speed">
                  air
                </span>
                <span className="item_font">
                  {weathers?.current?.wind_speed}
                </span>
              </div>
              <div className="item suns">
                <span className="material-symbols-outlined wind-deg">
                  explore
                </span>
                <span className="item_font">
                  {weathers?.current?.wind_deg} &#176;
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <div className="grid-container">
          {weathers?.daily?.map((w, i) => (
            <div key={i} className={`grid-item ${theme}`}>
              <div>{createDate(w.dt)}</div>
              <div>
                {
                  <img
                    alt="weather icon"
                    width="70px"
                    src={
                      w?.weather?.[0]?.icon &&
                      `http://openweathermap.org/img/wn/${w?.weather?.[0]?.icon}@2x.png`
                    }
                  />
                }
                <div>{w?.weather?.[0]?.description}</div>
              </div>
              <div className="abreast">
                <div>{w?.temp?.day} &#176;</div>
                <div className="night_degree">{w?.temp?.night} &#176;</div>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default Weather;
