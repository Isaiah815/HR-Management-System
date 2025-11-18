import { Component,OnInit } from '@angular/core';
import { Payroll,PayrollService } from '../../services/payroll';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payroll',
  imports: [FormsModule,CommonModule],
  templateUrl: './payroll.html',
  styleUrls: ['./payroll.scss']
})
export class PayrollComponent implements OnInit {

  payrolls: Payroll [] = [];
  currentPayRoll =  {
    payRollId: 0, 
    employeeId:0, 
    basicSalary:0,
    allowances: 0,
    deductions:0,
    netSalary:0,
    payDate: new Date()
  }
  isEditing= false;

  constructor(private payRollService:PayrollService){}

  ngOnInit(): void {
    this.loadAllPayRolls()
  }

  loadAllPayRolls(): void{
    this.payRollService.getAllPayRolls().subscribe( data =>{
      this.payrolls = data;
    });
  }
  savePayRoll(): void{
    if(!this.currentPayRoll.employeeId|| !this.currentPayRoll.basicSalary||
      !this.currentPayRoll.allowances
      ||! this.currentPayRoll.payDate
    ){
      alert("Please Fill All the fields");
      return;
    }
    if (this.isEditing){
      this.payRollService.updatePayRoll(this.currentPayRoll.payRollId, this.currentPayRoll)
      .subscribe({
        next:()=>{
          alert("Updated successfully");
          this.currentPayRoll={  
                payRollId: 0, 
                employeeId:0, 
                basicSalary:0,
                allowances: 0,
                deductions:0,
                netSalary:0,
                payDate: new Date()}
                this.loadAllPayRolls();
        }, error:(err)=>{
          console.error("Update failed",err);
          alert("Try again later");
        }
      });
  }
  else{ this.payRollService.postPayRoll(this.currentPayRoll).subscribe({
    next:()=>{
      alert("Added successfully");
      this.currentPayRoll = { payRollId: 0, 
                employeeId:0, 
                basicSalary:0,
                allowances: 0,
                deductions:0,
                netSalary:0,
                payDate: new Date()}
      this.loadAllPayRolls();
    }, error:(err)=>{
      console.error("Failed to add")
      alert("Employee does not exist")
    }
  });
}
  }

  editPayRoll(payroll:Payroll): void{
    this.currentPayRoll ={ ...payroll}
    this.isEditing = true;
  }

  deletePayRoll(id: number): void{
    if ( confirm( "Are you sure to delete this record?")){
      this.payRollService.deletePayRoll(id).subscribe({
      next:()=>{
        alert("Deleted sucessfully");
        this.loadAllPayRolls();

      }
    });
  }
}
cancelEdit(): void{
  this.isEditing = false;
  this.currentPayRoll = {payRollId: 0, 
                employeeId:0, 
                basicSalary:0,
                allowances: 0,
                deductions:0,
                netSalary:0,
                payDate: new Date()}
}
    
}
