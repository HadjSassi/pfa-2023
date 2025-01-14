package ENSIT.GeniInfo1.PFA1.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Departement implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private int numDep;

    private String intituleDep;

    private float budgetDep;

    @Column(columnDefinition = "integer default 1")
    private int directeur ;


    public Departement() {}

    public int getNumDep() {
        return numDep;
    }

    public void setNumDep(int numDep) {
        this.numDep = numDep;
    }

    public String getIntituleDep() {
        return intituleDep;
    }

    public void setIntituleDep(String intituleDep) {
        this.intituleDep = intituleDep;
    }

    public float getBudgetDep() {
        return budgetDep;
    }

    public void setBudgetDep(float budgetDep) {
        this.budgetDep = budgetDep;
    }

    public int getDirecteur() {
        return directeur;
    }

    public void setDirecteur(int directeur) {
        this.directeur = directeur;
    }

    @Override
    public String toString() {
        return "Departement{" +
                "numDep=" + numDep +
                ", intituleDep='" + intituleDep + '\'' +
                ", budgetDep=" + budgetDep +
                ", id_directeur=" + directeur +
                '}';
    }
}