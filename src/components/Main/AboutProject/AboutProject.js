function AboutProject() {
  return (
    <main className="aboutProject-container">
      <h2 className="aboutProject-title">О проекте</h2>
      <section className="aboutProject-info">
        <article className="aboutProject-info-content">
          <h3 className="aboutProject-info-content-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutProject-info-content-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </article>
        <article className="aboutProject-info-content">
          <h3 className="aboutProject-info-content-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutProject-info-content-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </section>
      <section className="aboutProject-chart">
        <div className="aboutProject-chart-box-first">
          <p className="aboutProject-chart-time aboutProject-chart-time_black">
            1 неделя
          </p>
          <p className="aboutProject-chart-name">Back-end</p>
        </div>
        <div className="aboutProject-chart-box-second">
          <p className="aboutProject-chart-time aboutProject-chart-time_white">
            4 недели
          </p>
          <p className="aboutProject-chart-name">Front-end</p>
        </div>
      </section>
    </main>
  );
}

export default AboutProject;
