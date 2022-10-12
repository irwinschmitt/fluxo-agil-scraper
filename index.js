const puppeteer = require("puppeteer");

const coursesPage = "https://sigaa.unb.br/sigaa/public/curso/lista.jsf?nivel=G&aba=p-graduacao";

const getDepartments = async (page) => {
  const departmentsSelector = "table.listagem tbody td.subFormulario";

  const rawDepartments = await page.$$eval(departmentsSelector, (departments) => {
    return departments.map((department) => department.innerText);
  });

  const departments = rawDepartments.map((department) => {
    const [acronym, title] = department.split(" - ");

    return {
      acronym,
      title,
    };
  });

  return departments;
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(coursesPage);

  const departments = await getDepartments(page);

  await browser.close();
})();
